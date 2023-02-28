import { useState } from 'react'
import Contacts from './Contacts/Contacts'
import Conversations from './Conversations/Conversations'
import ContactModal from './Modals/ContactModal'

const SideBar = ({ id }: any) => {
  const [section, setSection] = useState<string>('conversations')
  const [isModalShown, setIsModalShown] = useState<boolean>(false)

  return (
    <>
      {isModalShown ? <ContactModal setIsModalShown={setIsModalShown} /> : ''}
      <div
        className={`flex flex-col w-screen h-screen ${
          isModalShown ? 'filter: blur-lg bg-slate-400' : ''
        }`}
      >
        <div className="w-96 flex ml-2 flex-row justify-around border-solid border border-stone-500">
          <div
            onClick={() => setSection('conversations')}
            style={{ borderRight: '1px solid gray' }}
            className={`w-full flex justify-center items-center text-center p-4 ${
              section === 'conversations' ? 'text-blue-500 font-bold' : 'text-gray-500'
            } conversationContainer cursor-pointer`}
          >
            Conversations
          </div>
          <div
            onClick={() => setSection('contacts')}
            style={{ borderRight: '1px solid gray' }}
            className={`w-full flex justify-center items-center text-center p-4 ${
              section === 'contacts' ? 'text-blue-500 font-bold' : 'text-gray-500'
            } conversationContainer cursor-pointer`}
          >
            Contacts
          </div>
        </div>
        <div style={{ height: '85vh' }} className="m-2 w-3/4 border-solid border border-stone-500">
          {section === 'conversations' ? <Conversations /> : <Contacts />}
        </div>
        <div className="ml-2 text-gray-900 font-bold">
          Your Id is : <span className="text-sm text-gray-600">{id}</span>
        </div>

        {/* Modal */}

        <div className="w-2/3 flex justify-center items-center">
          <button
            onClick={() => {
              if (section === 'contacts') {
                setIsModalShown((prevState) => !prevState)
              } else return
            }}
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            New {section}
          </button>
        </div>
      </div>
    </>
  )
}

export default SideBar
