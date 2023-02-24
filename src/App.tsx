import { useState } from 'react'
import './App.css'
import Login from './components/Login'

function App() {
  const [id, setId] = useState<string>('')

  return (
    <div className="App">
      {id}
      <Login onSubmitId={setId} />
    </div>
  )
}

export default App
