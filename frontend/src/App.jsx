import React from 'react'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Buslist from './pages/Buslist'
import BusSeats from './pages/BusSeats'
import Admin from './Components/Admin'
import Bookinglist from './pages/Bookinglist'
import BuslistsAdmin from './pages/BuslistsAdmin'
import UserListAdmin from './pages/UserListAdmin'
import Bookings from './pages/Bookings'
import BookingListForOpreators from './pages/BookingListForOpreators'

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
<Route path='/admin' element={<Admin/>}/>
<Route path='/bookinglist'  element={<Bookinglist/>}/>
<Route path='/buslisting' element={<BuslistsAdmin/>}/>
<Route path='/userlisting' element={<UserListAdmin/>}/>
<Route path='/bookings/:userId'  element={<Bookings/>}/>
<Route path='/booking/:busId' element={<BookingListForOpreators/>}/>
      </Routes>
    
    </div>
  )
}

export default App
