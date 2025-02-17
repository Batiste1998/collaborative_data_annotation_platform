import { createContext, useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext'

const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Créer une connexion Socket.io avec le token d'authentification
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token')
        }
      })

      // Gestionnaires d'événements Socket.io
      newSocket.on('connect', () => {
        console.log('Connected to chat')
        setIsConnected(true)
      })

      newSocket.on('disconnect', () => {
        console.log('Disconnected from chat')
        setIsConnected(false)
      })

      newSocket.on('new_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message].sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        ))
      })

      newSocket.on('error', (error) => {
        console.error('Socket error:', error)
      })

      setSocket(newSocket)

      // Nettoyer la connexion lors du démontage
      return () => {
        newSocket.disconnect()
      }
    }
  }, [user])

  // Charger l'historique des messages avec pagination
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || isLoading) return
      
      setIsLoading(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        
        if (currentPage === 1) {
          setMessages(data.messages)
        } else {
          setMessages(prevMessages => {
            const newMessages = [...data.messages, ...prevMessages]
            return newMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          })
        }
        
        setTotalPages(data.pagination.pages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    if (user) {
      fetchMessages()
    }
  }, [user])

  const sendMessage = (content) => {
    if (socket && isConnected) {
      socket.emit('send_message', { content })
    }
  }

  const markMessageAsRead = async (messageId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const loadMoreMessages = () => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const value = {
    messages,
    sendMessage,
    markMessageAsRead,
    isConnected,
    loadMoreMessages,
    hasMoreMessages: currentPage < totalPages,
    isLoading
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat doit être utilisé à l\'intérieur d\'un ChatProvider')
  }
  return context
}
