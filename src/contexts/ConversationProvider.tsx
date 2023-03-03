import React, { useContext } from 'react'
import { childrenProps, conversationsType } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext<() => conversationsType[]>(() => [])
const setConversationContext = React.createContext<(recipients: string[]) => void>(() => {})

const ConversationProvider: React.FC<childrenProps> = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const contacts = useContacts()

  const createConversation = (recipients: string[]) => {
    setConversations((prevState: string[]) => {
      return [...prevState, { recipients, messages: [] }]
    })
  }

  //! FormattedConversation include name and Id  instead of just an string Id
  const formattedConversation = () => {
    const recipients = conversations.map((recipient: string) => {
      console.log(recipient)
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    return { ...conversations, recipients }
  }

  return (
    <ConversationContext.Provider value={formattedConversation}>
      <setConversationContext.Provider value={createConversation}>
        {children}
      </setConversationContext.Provider>
    </ConversationContext.Provider>
  )
}

export default ConversationProvider

export const useConversations = () => useContext(ConversationContext)
export const useCreateConversations = () => useContext(setConversationContext)
