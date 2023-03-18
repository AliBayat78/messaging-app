import { useState } from 'react'
import { useConversations } from '../../contexts/ConversationProvider'
import './openConversation.css'

const OpenConversation = () => {
  const [text, setText] = useState<string>('')
  const { sendMessage, currentSelectedConversation } = useConversations()

  const handleSend = () => {
    sendMessage(
      currentSelectedConversation.recipients.map((r) => r.id),
      text,
    )
    setText('')
  }

  return (
    <div className="conversation-container w-2/3 flex mr-4 flex-row justify-center items-end border-solid border border-stone-500">
      <div className="h-[10%] mb-4 max-h-[15%] min-w-[60%] flex flex-row justify-center items-center">
        <textarea
          className="h-[93%] min-w-[60%]"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        />
        <button
          onClick={() => handleSend()}
          className="w-20 h-full cursor-pointer flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default OpenConversation
