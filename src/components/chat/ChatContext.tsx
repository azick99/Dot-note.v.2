import { createContext, useRef, useState, useCallback } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";

type StreamResponse = {
  message: string;
  addMessage: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

type ChatProviderProps = {
  fileId: string;
  children: React.ReactNode;
};

export const ChatProvider = ({ fileId, children }: ChatProviderProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const utils = trpc.useContext();
  const { toast } = useToast();

  const backupMessage = useRef("");

  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup function for stream reader
  const cleanupStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      // Abort any existing request before starting a new one
      cleanupStream();
      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
        signal: abortControllerRef.current.signal,
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.body;
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message;
      setMessage("");
      //step 1
      await utils.getFileMessages.cancel();
      // step 2
      const previosMessages = utils.getFileMessages.getInfiniteData();

      //step 3
      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            };
          }
          let newPages = [...old.pages];

          let latestPage = newPages[0]!;
          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ];

          newPages[0] = latestPage;

          return {
            ...old,
            pages: newPages,
          };
        },
      );

      setIsLoading(true);

      return {
        perviosMessages:
          previosMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },

    onSuccess: async (stream) => {
      if (!stream) {
        setIsLoading(false);
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // accumulated response
      let accResponse = "";
      try {
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          accResponse += chunkValue;

          // append chunk to the actual message
          utils.getFileMessages.setInfiniteData(
            { fileId, limit: INFINITE_QUERY_LIMIT },
            (old) => {
              if (!old) return { pages: [], pageParams: [] };

              let isAiResponseCreated = old.pages.some((page) =>
                page.messages.some((message) => message.id === "ai-response"),
              );

              let updatedPages = old.pages.map((page) => {
                if (page === old.pages[0]) {
                  let updatedMessages;

                  if (!isAiResponseCreated) {
                    updatedMessages = [
                      {
                        createdAt: new Date().toISOString(),
                        id: "ai-response",
                        text: accResponse,
                        isUserMessage: false,
                      },
                      ...page.messages,
                    ];
                  } else {
                    updatedMessages = page.messages.map((message) => {
                      if (message.id === "ai-response") {
                        return {
                          ...message,
                          text: accResponse,
                        };
                      }
                      return message;
                    });
                  }

                  return {
                    ...page,
                    messages: updatedMessages,
                  };
                }

                return page;
              });

              return { ...old, pages: updatedPages };
            },
          );
        }
      } catch (error) {
        // Handle abort error silently (user cancelled)
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        toast({
          title: "Error receiving response",
          description: "There was a problem receiving the AI response.",
          variant: "destructive",
        });
      } finally {
        reader.releaseLock();
        cleanupStream();
        setIsLoading(false);
        await utils.getFileMessages.invalidate({ fileId });
      }
      return;
    },
    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.perviosMessages ?? [] },
      );
    },
    onSettled: async () => {
      setIsLoading(false);

      cleanupStream();
    },
  });
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    [],
  );
  const addMessage = useCallback(
    () => sendMessage({ message }),
    [sendMessage, message],
  );

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
  );
};
