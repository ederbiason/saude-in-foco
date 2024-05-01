import { ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageModel, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useState } from "react";

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

    async function processMessageToChatGPT(chatMessages: MessageModel[]) {
        const apiMessages = chatMessages.map((messageObject) => {
            let role = ""

            messageObject.sender === "HealthBot" ? role = "assistant" : role = "user"

            return { role: role, content: messageObject.message }
        })

        const systemMessage = {
            role: "system",
            content: "Escreva como se você fosse um médico, mas apenas passando orientações para o usuário. Ele te fornecerá os sintomas que esta sentindo e você precisa responder quais doenças ele possivelmente tem. Lembre sempre de orienta-lo a buscar um médico, pois você é uma inteligencia artificial apenas."
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then((data) => {
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "HealthBot",
                    direction: 0,
                    position: 0
                }]
            )
            setTyping(false)
        })
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