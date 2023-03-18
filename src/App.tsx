import './App.css'
import DashBoard from './components/DashBoard'
import Login from './components/Login'
import useLocalStorage from './hooks/useLocalStorage'
import ContactsProvider from './contexts/ContactsProvider'
import ConversationProvider from './contexts/ConversationProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  return (
    <ContactsProvider>
      <ConversationProvider id={id}>
        <div className="App">{id ? <DashBoard id={id} /> : <Login onSubmitId={setId} />}</div>
      </ConversationProvider>
    </ContactsProvider>
  )
}

export default App
