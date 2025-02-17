import ChatWindow from '../components/chat/ChatWindow'
import { ChatProvider } from '../context/ChatContext'

const ChatPage = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Messagerie</h1>
        <ChatProvider>
          <ChatWindow />
        </ChatProvider>
      </div>
    </div>
  )
}

export default ChatPage
