import { useState } from 'react'
import { useContacts } from '../../../contexts/ContactsProvider'
import { useCreateConversations } from '../../../contexts/ConversationProvider'

type ConcatModalTypeProps = {
  setIsModalShown: React.Dispatch<React.SetStateAction<string>>
}

const ConversationModal: React.FC<ConcatModalTypeProps> = ({ setIsModalShown }) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])

  const createConversation = useCreateConversations()
  const contacts = useContacts()

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((id) => id !== contactId)
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  const submitHandler = () => {
    createConversation(selectedContactIds)
    setIsModalShown('')
  }

  return (
    <div className="flex justify-center items-center fixed z-30 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal">
      <div className="absolute z-50 w-2/6">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex flex-row justify-around items-center">
            <h3>Create Conversation</h3>
            <button
              onClick={() => setIsModalShown('')}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="py-6 ml-4 flex flex-col justify-center items-start ">
            <div className="w-full">
              {contacts.map((contact) => (
                <label
                  key={Math.random() + Math.random()}
                  className="flex w-full flex-row justify-between items-center"
                  htmlFor={contact.id}
                >
                  {contact.name}
                  <input
                    type="checkbox"
                    name="Id"
                    id={contact.id}
                    className="w-8"
                    value={selectedContactIds.includes(contact.id) ? contact.id : ''}
                    checked={selectedContactIds.includes(contact.id)}
                    onChange={() => handleCheckboxChange(contact.id)}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={() => submitHandler()}
              className="w-20 cursor-pointer mt-2 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div
        className="absolute w-screen h-screen top-0 left-0 z-40 filter: blur-lg bg-slate-400"
        onClick={() => setIsModalShown('')}
      ></div>
    </div>
  )
}

export default ConversationModal
