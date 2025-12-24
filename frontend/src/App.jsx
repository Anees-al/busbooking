import React from 'react'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    
    <div>
      <ToastContainer/>
      <Routes>
<Route path='/' element={<Home/>} />
<Route path='/login' element={<Login/>} />
      </Routes>
    
    </div>
  )
}

export default App
