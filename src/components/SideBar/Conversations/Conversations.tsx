import { useConversations } from '../../../contexts/ConversationProvider'
import { useEffect } from 'react'

const Conversations = () => {
  const conversations = useConversations()

  useEffect(() => {
    console.log(conversations)
  }, [])

  return (
    <div>
      {conversations.map((conversation: any) => {
        return (
          <p key={Math.random() + Number(conversation.recipients.id)}>
            {conversation.recipients.name}
          </p>
        )
      })}
    </div>
  )
}

export default Conversations
