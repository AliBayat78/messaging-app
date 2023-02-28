import { useContacts } from '../../../contexts/ContactsProvider'

const Contacts = () => {
  const contacts = useContacts()

  return (
    <div>
      {contacts.map((contact) => {
        return <p key={Math.random() + Number(contact.id)}>{contact.name}</p>
      })}
    </div>
  )
}

export default Contacts
