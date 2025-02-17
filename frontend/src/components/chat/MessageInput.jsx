import { useState } from 'react'
import { useChat } from '../../context/ChatContext'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { sendMessage, isConnected } = useChat()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && isConnected) {
      sendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez votre message..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!isConnected}
      />
      <button
        type="submit"
        disabled={!message.trim() || !isConnected}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Envoyer
      </button>
    </form>
  )
}

export default MessageInput
