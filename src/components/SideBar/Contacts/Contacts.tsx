import { useContacts } from '../../../contexts/ContactsProvider'

const Contacts = () => {
  const contacts = useContacts()

  return (
    <div>
      {contacts.map((contact) => {
        return <p key={contact.id}>{contact.name}</p>
      })}
    </div>
  )
}

export default Contacts
