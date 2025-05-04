import { db } from '@/db'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from '@langchain/openai'
import { pinecone } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'
import { currentUser } from '@clerk/nextjs/server'

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const user = await currentUser()

      if (!user || !user?.id) {
        throw new Error('Unauthorized')
      }

      return { userId: user.id }
    })

    .onUploadComplete(
      async ({
        metadata,
        file,
      }: {
        metadata: { userId: string }
        file: { key: string; name: string; url: string }
      }) => {
        const isFileExist = await db.file.findFirst({
          where: { key: file.key },
        })

        if (isFileExist) return

        const createdFile = await db.file.create({
          data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: file.url,
            uploadStatus: 'PROCESSING',
          },
        })

        try {
          console.log('⬇️ Fetching PDF file...')
          const response = await fetch(file.url)
          if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
          const blob = await response.blob()

          console.log('📄 Loading PDF using PDFLoader...')
          const loader = new PDFLoader(blob as any) // keeping your approach
          const pageLevelDocs = await loader.load()

          console.log('🧠 Generating OpenAI embeddings...')
          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY!,
          })

          console.log('📥 Uploading to Pinecone...')
          const pineconeIndex = pinecone.Index('dot-note')
          await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
            pineconeIndex,
            namespace: createdFile.id,
          })

          console.log('✅ Marking file as SUCCESS')
          await db.file.update({
            where: { id: createdFile.id },
            data: { uploadStatus: 'SUCCESS' },
          })
        } catch (err) {
          console.error('❌ Error during PDF processing:', err)
          await db.file.update({
            where: { id: createdFile.id },
            data: { uploadStatus: 'FAILED' },
          })
        }
      }
    ),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
