import { useEffect, useState } from "react"
import useWebSocket, { ReadyState} from "react-use-websocket"
import axios from "axios"

export default function GenerateImage() {
    const URL = "http://184.73.52.74"
    const WS_URL = "ws://184.73.52.74/ws"

    const [prompt, setPrompt] = useState("")
    const [imgUrl, setImgUrl] = useState<any>()
   // const [display, setDisplay] = useState(false)

    const { lastJsonMessage, readyState, lastMessage } = useWebSocket(
        WS_URL,
        {
            share: true,
            shouldReconnect: () => true
        }
    )

    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            console.log("Great, connection ready!")
        }
    }, [readyState])

    useEffect(() => {
        setImgUrl(lastJsonMessage)
        console.log(lastJsonMessage)
        console.log(lastMessage)
    }, [lastJsonMessage, lastMessage])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setPrompt("")
        await axios.post(
            `${URL}/generated-images`,
            { prompt: prompt}
        )
    }

    return (
        <div className="flex flex-col h-screen p-4">
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)} 
                        className="p-2 rounded-md focus:outline-none border-blue-200 border-2 max-w-[300px]"
                    />
                    <button type="submit" className="px-2 py-1 bg-blue-500 max-w-[300px]">
                        Generate
                    </button>
                </form>
            </div>
            <div className="flex items-center justify-center mt-6">
                { imgUrl && (
                    <img
                        src={imgUrl.message}
                        className="size-96 rounded-lg object-cover" 
                    />
                )}
            </div>
        </div>
    )
}