import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from '@langchain/openai'
import { pinecone } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

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
          where: {
            key: file.key,
          },
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
          const response = await fetch(file.url)
          const blob = await response.blob()
          const loader = new PDFLoader(blob)

          const pageLavelDocs = await loader.load()

          // vecotrize

          const pineconeIndex = pinecone.Index('dot-note')

          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
          })

          await PineconeStore.fromDocuments(pageLavelDocs, embeddings, {
            pineconeIndex,
            namespace: createdFile.id,
          })

          await db.file.update({
            where: {
              id: createdFile.id,
            },
            data: {
              uploadStatus: 'SUCCESS',
            },
          })
        } catch (err) {
          await db.file.update({
            where: {
              id: createdFile.id,
            },
            data: {
              uploadStatus: 'FAILED',
            },
          })
        }
      }
    ),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
