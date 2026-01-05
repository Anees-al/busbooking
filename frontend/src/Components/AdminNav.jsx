import React from 'react'
import buslogo from '../assets/buslogo.png'
import { useNavigate } from 'react-router'

const AdminNav = () => {
    const navigate =useNavigate()
  return (
    <div className='flex flex-row p-6 justify-between font-mono bg-gray-700'>
      <div>
        <img src={buslogo} alt=""  className='w-[60px] rounded-lg cursor-pointer' onClick={()=>navigate('/')}/>
      </div>
      <div className='flex flex-row gap-8 font-semibold text-white'>
        <p className='cursor-pointer' onClick={()=>navigate('/buslisting')}>bus lists</p>
        <p className='cursor-pointer' onClick={()=>navigate('/userlisting')}>users list</p>
        <p className='cursor-pointer' onClick={()=>navigate('/bookinglist')}>booking list</p>
      </div>
      <div></div>
    </div>
  )
}

export default AdminNav
