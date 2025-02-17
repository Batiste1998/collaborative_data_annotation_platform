import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const MessageList = () => {
  const { messages, loadMoreMessages, hasMoreMessages, isLoading } = useChat()
  const { user } = useAuth()

  return (
    <div className="space-y-4">
      {hasMoreMessages && (
        <div className="flex justify-center">
          <button
            onClick={loadMoreMessages}
            disabled={isLoading}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            {isLoading ? 'Chargement...' : 'Charger les messages précédents'}
          </button>
        </div>
      )}
      {messages.map((message) => {
        const isOwnMessage = message.sender._id === user._id
        
        return (
          <div
            key={message._id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isOwnMessage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {!isOwnMessage && (
                <div className="mb-1 text-sm font-semibold">
                  {message.sender.username}
                </div>
              )}
              <div className="break-words">{message.content}</div>
              <div
                className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {format(new Date(message.createdAt), 'HH:mm', { locale: fr })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageList
