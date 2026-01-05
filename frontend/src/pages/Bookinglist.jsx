import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useServer } from '../Context'
import { toast } from 'react-toastify'

const Bookinglist = () => {
    const [list,setLists]=useState([])
    const {BASE_URL} =useServer()


    useEffect(()=>{
          const fetchbookings=async()=>{
            try {
                const res=await axios.get(`${BASE_URL}api/booking/getbooking`);
                setLists(res.data.bookings);
                toast.success('succesfully fetch')
            } catch (error) {
                toast.error(error)
            }
          }
          fetchbookings();
    },[])
  return (
    <div>

      {list.map((li)=>(
           <div className='' key={li._id}>
          {li.travelDate}
           </div>
      ))}
    </div>
  )
}

export default Bookinglist
