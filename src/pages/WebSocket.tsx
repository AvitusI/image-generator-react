import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WebSocketPage = () => {
    const WS_URL = "ws://localhost:8000/ws"

    const [messages, addMessages] = useState<any[]>([])
    const [message, addMessage] = useState("")

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            share: true,
            shouldReconnect: () => true
        }
    )

    // Run when the connection state (readyState) changes
    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                "Greeting": "Hello"
            })
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
      addMessages((msgs) => ([...msgs, lastJsonMessage]))
      console.log(lastJsonMessage)
    }, [lastJsonMessage])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        sendJsonMessage({
            message: message
        })
        addMessage("")
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        value={message}
                        onChange={(e) => addMessage(e.target.value)}
                        className="px-4 py-2 focus:outline-none border-blue-500"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {lastJsonMessage ? (
                <div>
                    {messages.map((msg, i) => (
                        <div key={i}>{msg?.message}</div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default WebSocketPage;