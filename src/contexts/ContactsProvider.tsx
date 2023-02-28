import React, { useContext } from 'react'
import { childrenProps, contactType } from '../models/models'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext<contactType[]>([])
const setContactsContext = React.createContext<({ id, name }: contactType) => void>(() => {})

const ContactsProvider: React.FC<childrenProps> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  const createContact = ({ id, name }: contactType) => {
    setContacts((prevState: any) => {
      return [...prevState, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={contacts}>
      <setContactsContext.Provider value={createContact}>{children}</setContactsContext.Provider>
    </ContactsContext.Provider>
  )
}

export default ContactsProvider

export const useContacts = () => useContext(ContactsContext)
export const useCreateContacts = () => useContext(setContactsContext)
