import { useConversations } from '../../../contexts/ConversationProvider'
import { useEffect } from 'react'

const Conversations = () => {
  const { conversations, setSelectedConversationIndex, selectedConversationIndex } =
    useConversations()

  return (
    <div>
      <div>
        <h2>Conversations:</h2>
        {conversations.map((conversation, index) => (
          <div
            onClick={() => setSelectedConversationIndex(index)}
            key={Math.random() + Math.random()}
            className={`${selectedConversationIndex === index ? 'bg-sky-600' : ''}`}
          >
            <ul>{conversation.recipients.map((r) => r.name).join(', ')}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conversations
