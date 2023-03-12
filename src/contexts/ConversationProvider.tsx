import React, { useContext, useEffect } from 'react'
import { childrenProps, conversationsType } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext<conversationsType[]>([])
const setConversationContext = React.createContext<(recipients: string[]) => void>(() => {})

const ConversationProvider: React.FC<childrenProps> = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
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
    setConversations((prevConversations: any[]) => [
      ...prevConversations,
      { ...newConversation, recipients: formattedRecipients },
    ])
  }

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  return (
    <ConversationContext.Provider value={conversations}>
      <setConversationContext.Provider value={createConversation}>
        {children}
      </setConversationContext.Provider>
    </ConversationContext.Provider>
  )
}

export default ConversationProvider

export const useConversations = () => useContext(ConversationContext)
export const useCreateConversations = () => useContext(setConversationContext)
