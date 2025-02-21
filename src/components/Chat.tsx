import { ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageModel, TypingIndicator } from "@chatscope/chat-ui-kit-react"
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { useState } from "react"
import OpenAI from "openai"

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export function Chat() {
    const [messages, setMessages] = useState<MessageModel[]>([])
    const [typing, setTyping] = useState(false)

    const handleSend = async (message: string) => {
        const newMessage: MessageModel = {
            message: message,
            sender: "user",
            direction: "outgoing",
            position: "first"
        }

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setTyping(true)

        await processMessageToChatGPT(newMessages)
    }

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true
    });
    
    async function processMessageToChatGPT(chatMessages: MessageModel[]) {
        const apiMessages: { role: "system" | "user" | "assistant"; content: string }[] = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "HealthBot" ? "assistant" : "user"
            return { role, content: messageObject.message || "" } 
        })
    
        const systemMessage: { role: "system"; content: string } = {
            role: "system",
            content: "Escreva como se você fosse um médico, mas apenas passando orientações para o usuário. Ele te fornecerá os sintomas que está sentindo e você precisa responder quais doenças ele possivelmente tem. Lembre sempre de orientá-lo a buscar um médico, pois você é uma inteligência artificial apenas."
        }
    
        try {
            const completion = await openai.chat.completions.create({
                model: "deepseek/deepseek-chat:free",
                messages: [systemMessage, ...apiMessages]
            })
    
            setMessages([
                ...chatMessages,
                {
                    message: completion.choices[0].message.content || "Não consegui entender sua solicitação.",
                    sender: "HealthBot",
                    direction: 0,
                    position: 0
                }
            ])
    
            setTyping(false)
        } catch (error) {
            console.error("Erro ao processar a mensagem com DeepSeek:", error)
        }
    }

    return (
        <div className="h-[500px]">
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={typing ? <TypingIndicator content="HealthBot está digitando!" /> : null}
                    >
                        <div className="p-5">
                            <h1 className="font-bold text-2xl">
                                Health Bot
                            </h1>

                            <p className="text-sm text-slate-400">
                                O Health Bot é um chatbot onde você pode realizar um autodiagnóstico a partir dos sintomas que você está sentindo. Lembrando que esse processo é feito por uma inteligência artificial, portanto serve apenas como uma sugestão. O aconselhado é buscar um médico profissional.
                            </p>
                        </div>

                        {
                            messages.map((message, index) => {
                                return <Message key={index} model={message} />
                            })
                        }
                    </MessageList>
                    <MessageInput onSend={handleSend} placeholder="Escreva seus sintomas aqui..." attachButton={false} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}