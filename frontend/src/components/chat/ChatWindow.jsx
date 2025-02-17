import { useEffect, useRef } from 'react'
import { useChat } from '../../context/ChatContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatWindow = () => {
  const { isConnected } = useChat()
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [])

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b rounded-t-lg bg-gray-50">
        <h2 className="text-xl font-semibold">Chat Global</h2>
        <div className="text-sm text-gray-500">
          {isConnected ? (
            <span className="text-green-500">Connecté</span>
          ) : (
            <span className="text-red-500">Déconnecté</span>
          )}
        </div>
      </div>
      
      <div 
        ref={chatRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto"
      >
        <MessageList />
      </div>

      <div className="p-4 border-t">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatWindow
