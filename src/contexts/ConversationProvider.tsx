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
    setConversations((prevState: string[]) => {
      return [...prevState, { recipients, messages: [] }]
    })
  }

  //? Wrong Approach
  // const formattedConversation = () => {
  //   const recipients = conversations.map((recipient: any) => {
  //     console.log('contacts: ' + contacts.map((c) => c.id))
  //     console.log('recipient.recipients: ' + recipient.recipients)
  //     const contact: any = contacts.filter((contact) => {
  //       const name = (contact && contact.name) || recipient
  //       return recipient.recipients.filter((r: string) => (r === contact.id ? name : null))
  //     })
  //     console.log('name ' + contact.name)
  //     return { id: recipient.recipients, name: contact }
  //   })
  //   return { ...conversations, recipients }
  // }

  //! FormattedConversation include name and Id  instead of just an string Id
  const formattedConversation = () => {
    return conversations.map((conversation: any) => {
      const recipients = conversation.recipients.map((recipientId: any) => {
        const contact = contacts.find((c) => c.id === recipientId)
        return {
          id: recipientId,
          name: contact ? contact.name : recipientId,
        }
      })
      return { ...conversation, recipients }
    })
  }

  useEffect(() => {
    console.log(formattedConversation())
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
