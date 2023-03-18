import { useConversations } from '../contexts/ConversationProvider'
import OpenConversation from './OpenConversation/OpenConversation'
import SideBar from './SideBar/SideBar'

type DashBoardTypeProps = {
  id: any
}

const DashBoard: React.FC<DashBoardTypeProps> = ({ id }) => {
  const { currentSelectedConversation } = useConversations()

  return (
    <div className="w-full flex flex-row justify-around items-end">
      <SideBar id={id} />
      {currentSelectedConversation && <OpenConversation />}
    </div>
  )
}

export default DashBoard
