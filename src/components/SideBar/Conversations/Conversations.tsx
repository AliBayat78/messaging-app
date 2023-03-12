import { useConversations } from '../../../contexts/ConversationProvider'
import { useEffect } from 'react'

const Conversations = () => {
  const conversations = useConversations()
  
  return (
    <div>
      <div>
        {conversations.map((conversation) => (
          <div key={conversation.recipients.join('-')}>
            <h2>Conversation:</h2>
            <ul>
              {conversation.recipients.map((recipient) => (
                <li key={recipient.id}>
                  Name: {recipient.name}, ID: {recipient.id}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conversations
