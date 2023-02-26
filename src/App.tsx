import './App.css'
import DashBoard from './components/DashBoard'
import Login from './components/Login'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [id, setId] = useLocalStorage('id')

  return <div className="App">{id ? <DashBoard id={id} /> : <Login onSubmitId={setId} />}</div>
}

export default App
