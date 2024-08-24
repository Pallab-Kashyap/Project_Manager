import { useState } from 'react'
import Sigin from './pages/signin/signin'
import './App.css'
import ChatInterface from './pages/chat/ChatInterface'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Sigin /> */}
     <ChatInterface />
    </>
  )
}

export default App
