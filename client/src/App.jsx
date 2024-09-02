import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import SignUP from './pages/Auth/SignUp'
import Background from './components/Background/Background'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignUP />} />
      </Routes>
    </Router>

  )
}

export default App
