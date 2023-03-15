import { useConversations } from '../../../contexts/ConversationProvider'
import { useEffect } from 'react'

const Conversations = () => {
  const { conversations } = useConversations()

  return (
    <div>
      <div>
        <h2>Conversations:</h2>
        {conversations.map((conversation) => (
          <div key={Math.random() + Math.random()}>
            <ul>{conversation.recipients.map((r) => r.name).join(', ')}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conversations
