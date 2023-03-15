import React, { useContext, useEffect, useState } from 'react'
import { childrenProps, conversationsType } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

type ConversationContextType = {
  conversations: conversationsType[]
  selectedConversationIndex: number
  setSelectedConversationIndex: (index: number) => void
  createConversation: (recipients: string[]) => void
}

const ConversationContext = React.createContext<ConversationContextType>({
  conversations: [],
  selectedConversationIndex: 0,
  setSelectedConversationIndex: () => {},
  createConversation: () => {},
})

const ConversationProvider: React.FC<childrenProps> = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0)
  const contacts = useContacts()

  const createConversation = (recipients: string[]) => {
    const newConversation = { recipients, messages: [] }
    //! FormattedConversation include name and Id  instead of just an string Id
    const formattedRecipients = recipients.map((recipientId: any) => {
      const contact = contacts.find((c) => c.id === recipientId)
      return {
        id: recipientId,
        name: contact ? contact.name : recipientId,
      }
    })

    setConversations((prevConversations: any[]) => {
      const index = prevConversations.findIndex((conversation) => conversation.selected)
      if (index !== -1) {
        prevConversations[index].selected = false
      }
      return [
        ...prevConversations,
        { ...newConversation, recipients: formattedRecipients, selected: true },
      ]
    })
  }

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  const contextValue: ConversationContextType = {
    conversations,
    selectedConversationIndex,
    setSelectedConversationIndex,
    createConversation,
  }

  return (
    <ConversationContext.Provider value={contextValue}>{children}</ConversationContext.Provider>
  )
}

export default ConversationProvider

export const useConversations = () => useContext(ConversationContext)
