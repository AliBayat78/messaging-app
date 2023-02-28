import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ContactsProvider from './contexts/ContactsProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </React.StrictMode>,
)
