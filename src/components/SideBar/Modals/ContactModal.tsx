import { useRef } from 'react'
import { useCreateContacts } from '../../../contexts/ContactsProvider'

type ConcatModalTypeProps = {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactModal: React.FC<ConcatModalTypeProps> = ({ setIsModalShown }) => {
  const idRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const createContact = useCreateContacts()

  const submitHandler = () => {
    if (idRef.current?.value && nameRef.current?.value) {
      createContact({ id: idRef.current?.value, name: nameRef.current?.value })
      setIsModalShown(false)
    }
    setIsModalShown(false)
  }

  return (
    <div className="flex justify-center items-center fixed z-30 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal">
      <div className="absolute z-50 w-1/6">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setIsModalShown(false)}
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
          <div className="py-6 ml-4 flex flex-col justify-center items-start ">
            <div className="w-full">
              <label
                htmlFor="Id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Id
              </label>
              <input
                ref={idRef}
                type="Id"
                name="Id"
                id="Id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Id"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                ref={nameRef}
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
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
        onClick={() => setIsModalShown(false)}
      ></div>
    </div>
  )
}

export default ContactModal
