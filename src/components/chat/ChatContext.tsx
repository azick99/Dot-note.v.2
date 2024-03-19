import { createContext, useRef, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { INFININATE_QUERY_LIMIT } from '@/config/inifininate-query'

type StreamResponse = {
  message: string
  addMessage: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
})

type ChatProviderProps = {
  fileId: string
  children: React.ReactNode
}

export const ChatProvider = ({ fileId, children }: ChatProviderProps) => {
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const utils = trpc.useContext()
  const { toast } = useToast()

  const backupMessage = useRef('')

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      return response.body
    },
    onMutate: async () => {
      backupMessage.current = message
      setMessage('')
      //step 1
      await utils.getFileMessages.cancel()
      // step 2
      const previosMessages = utils.getFileMessages.getInfiniteData()

      //step 3
      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFININATE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            }
          }
          let newPages = [...old.pages]

          let latestPage = newPages[0]!
          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
          ]
        }
      )
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }
  const addMessage = () => sendMessage({ message })

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
