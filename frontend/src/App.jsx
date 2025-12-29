import React from 'react'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Buslist from './pages/Buslist'
import BusSeats from './pages/BusSeats'

const App = () => {
  return (
    
    <div >
      <ToastContainer/>
      <Routes>
<Route path='/' element={<Home/>} />
<Route path='/login' element={<Login/>} />
<Route path='/buslist' element={<Buslist/>} />
<Route path='/buslist/route/:routePath' element={<Buslist/>}/>
<Route path='/buslist/operator/:busoperator' element={<Buslist/>} />
<Route path='/seatbook/:id'element={<BusSeats/>} />
      </Routes>
    
    </div>
  )
}

export default App
