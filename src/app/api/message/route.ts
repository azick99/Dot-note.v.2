import { NextRequest } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { SendMessageValidator } from '@/lib/validators/SendMessageValidator'
import { db } from '@/db'

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const userId = user?.id
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { fileId, message } = SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })
  if (!file) {
    return new Response('Not Found', { status: 404 })
  }

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      fileId,
      userId,
    },
  })

  //

  return new Response(null, { status: 200 })
}
