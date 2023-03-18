import React, { useContext, useEffect, useState } from 'react'
import { conversationChildrenProps, conversationsType } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

type ConversationContextType = {
  conversations: conversationsType[]
  selectedConversationIndex: number | null
  currentSelectedConversation: conversationsType
  sendMessage: (recipients: string[], text: string) => void
  setSelectedConversationIndex: (index: number) => void
  createConversation: (recipients: string[]) => void
}

type addMessageToConversationType = {
  recipients: string[]
  text: string
  sender: string
}

const ConversationContext = React.createContext<ConversationContextType>({
  conversations: [],
  selectedConversationIndex: 0,
  currentSelectedConversation: { recipients: [], messages: [], selected: false },
  sendMessage: () => {},
  setSelectedConversationIndex: () => {},
  createConversation: () => {},
})

const ConversationProvider: React.FC<conversationChildrenProps> = ({ children, id }) => {
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
      if (prevConversations[index] && index !== selectedConversationIndex) {
        prevConversations[index].selected = false
      }
      return [
        ...prevConversations,
        { ...newConversation, recipients: formattedRecipients, selected: true },
      ]
    })
  }

  const addMessageToConversation = ({ recipients, text, sender }: addMessageToConversationType) => {
    let madeChange = false

    setConversations((prevConversations: conversationsType[]) => {
      const newMessages = { sender, text }
      const updatedConversation = prevConversations.map((conversation, index) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          const cloneConversation = [...prevConversations]
          let selectedIndex = cloneConversation[index]
          console.log(selectedIndex)
          selectedIndex = { ...conversation, messages: [...conversation.messages, newMessages] }
          return cloneConversation
        }
        return conversation
      })

      const newConversation = prevConversations.map((conversation, index) => {
        const cloneConversation = [...prevConversations]
        let selectedIndex = cloneConversation[index]
        console.log(selectedIndex)
        selectedIndex = { ...conversation, messages: [newMessages] }
        return cloneConversation
      })

      if (madeChange) {
        return updatedConversation
      } else {
        return newConversation
      }
    })
  }

  const sendMessage = (recipients: string[], text: string) => {
    addMessageToConversation({ recipients, text, sender: id })
  }

  //* Check Selected Conversation and make it true or false
  useEffect(() => {
    setConversations((prevConversations: any[]) => {
      const index = prevConversations.findIndex((conversation) => conversation.selected)

      if (index !== selectedConversationIndex && prevConversations[index]) {
        prevConversations[index].selected = false
      }
      if (prevConversations[selectedConversationIndex]) {
        prevConversations[selectedConversationIndex].selected = true
      }
      return prevConversations
    })
  }, [selectedConversationIndex, conversations])

  const contextValue: ConversationContextType = {
    conversations,
    selectedConversationIndex,
    currentSelectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    setSelectedConversationIndex,
    createConversation,
  }

  return (
    <ConversationContext.Provider value={contextValue}>{children}</ConversationContext.Provider>
  )
}

export default ConversationProvider

export const useConversations = () => useContext(ConversationContext)

//? Checks if two Array is Equal or not
const arrayEquality = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  a.every((element: any, index) => {
    return element === b[index]
  })
}
