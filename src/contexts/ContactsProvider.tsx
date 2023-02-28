import React, { useContext } from 'react'
import { childrenProps } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext<Array<{ id: string; name: string }>>([])
const setContactsContext = React.createContext((id: string, name: string) => {})

const ContactsProvider: React.FC<childrenProps> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  const createContact = (id: string, name: string) => {
    setContacts((prevState: any) => {
      ;[...prevState, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={contacts}>
      <setContactsContext.Provider value={createContact}>{children}</setContactsContext.Provider>
    </ContactsContext.Provider>
  )
}

export const useContacts = useContext(ContactsContext)
export const useCreateContacts = useContext(setContactsContext)
