import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import SignUP from './pages/Auth/SignUp'
import Background from './components/Background/Background'
import Login from './pages/Auth/LogIn'
import ProjectPage from './pages/projectPage/ProjectPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    //<Background>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:id' element={<ProjectPage />} />
        <Route path='/signin' element={<SignUP />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
    </Router>
    //</Background> 
  )
}

export default App
