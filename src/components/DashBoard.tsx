import SideBar from './SideBar/SideBar'

type DashBoardTypeProps = {
  id: any
}

const DashBoard: React.FC<DashBoardTypeProps> = ({ id }) => {
  return (
    <div className="w-2/3">
      <SideBar id={id} />
    </div>
  )
}

export default DashBoard
