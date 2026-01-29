import React, { useEffect,  useState } from 'react'
import { useServer } from '../Context';
import axios from 'axios';
import { useParams } from 'react-router';

const BookingListForOpreators = () => {
     const [booking,setBooking]=useState([])
     const {BASE_URL}=useServer()
       const {busId}=useParams()
       const today=new Date().toISOString().split('T')[0];

     useEffect(()=>{
      const fetchBooking=async()=>{
        try {
        const res=await axios.get(`${BASE_URL}/api/booking/getbookingtobus/${busId}`);
        setBooking(res.data.booking);
        console.log(res.data.booking)
        console.log(today)
        } catch (error) {
             alert(error)
        }
      }

      fetchBooking();
     },[busId,BASE_URL])
  return (
   
    <div className='flex flex-col p-5 gap-6 font-mono'>
      <h1 className='text-4xl font-semibold '>Todays bookings</h1>
      <div className='flex flex-row gap-2 sm:gap-4 border border-black p-4 bg-black text-white w-auto sm:w-[500px]'>
            <p className='w-[50px]'>Index</p>
           <p className='w-[100px]'>Name</p>
           <p className='w-[100px]'>Booking Date</p>
           <p className='w-[100px]'>Seats booked</p>
      </div>
      <div className='flex flex-col gap-3 '>
     {booking.filter((books)=>{
        const bookingDate=new Date(books.travelDate).toISOString().split('T')[0];
        return bookingDate===today
     })
     .map((books,index)=>(
        <div key={books._id}o className='flex flex-row gap-2 sm:gap-4 border border-black p-4 w-auto sm:w-[500px]'>
            <p className='w-[50px]'>{index+1}</p>
            <p className='w-[100px]'>{books.userId.fullname}</p>
           <p className='w-[100px] text-xs'>{new Date(books.bookingDate).toISOString().split('T')[0]}</p>
           <p className=' flex flex-row w-[100px] gap-2 '>{books.seats.map((seat)=>(
            <p className='px-2 bg-gray-400 text-white text-sm'>{seat}</p>
           ))}</p>
        </div>
     ))}
      </div>
    </div>
  )
}

export default BookingListForOpreators
