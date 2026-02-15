import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminNav from '../Components/AdminNav'
import axios from 'axios'
import { useServer } from '../Context'
import { toast } from 'react-toastify'

const BuslistsAdmin = () => {
    const [bus,setBuse]=useState([]);
    const {BASE_URL}=useServer()
    useEffect(()=>{
        const fetchbuses=async()=>{
            try {
                const res=await axios.get(`${BASE_URL}/api/bus/getallbuses`);
                setBuse(res.data.buses);
                toast.success('successfully fetched')
            } catch (error) {
                toast.error(error)
            }
        }

        fetchbuses();
    },[])


    useEffect
  return (
    <div className='flex flex-col gap-4'>
        <AdminNav/> 
          <div className='flex flex-col gap-4 p-4'>
            <h1 className='text-4xl font-semibold font-mono'>Bus lists</h1>
            <div className='flex flex-row border border-black p-4 font-mono gap-5 bg-black text-white '>
                <p className='t w-[100px]'>name</p>
                <p className=' w-[100px]'>bustype</p>
                <p className=' w-[100px]'>operator</p>
                <p className='w-[100px]'>Route</p>
                 <p className='w-[200px]'>stops</p>
                 <p className='w-[100px]'>Total seats</p>
                 <p className='w-[200px] '>Air Conditioning</p>
                 <p className='w-[100px]'>Ownership</p>
            </div>
         {
        bus.map((b)=>(
            <div key={b._id} className='flex flex-row border border-black p-4 font-mono gap-5 '>
                <p className='text-red-500 w-[100px] font-semibold'>{b.busname}</p>
                <p className=' w-[100px]'>{b.bustype}</p>
                <p className=' w-[100px]'>{b.busoperator}</p>
                <p className='w-[100px]'>{b.routePath}</p>
                <p className='flex flex-col text-xs w-[200px]'>{b.stops.map((s)=>(
                    <p>{s.stationname}</p>
                ))}</p>
                <p className='w-[200px] '>{b.totalseats}</p>
              {b.isAC===true?<p className='w-[100px] text-center'>AC</p>:<p className='w-[100px]'>Non AC</p>}
              <p className='w-[100px]'>{b.busownership}</p>
            </div>

        ))
      }
        </div>
      
    </div>
  )
}

export default BuslistsAdmin
