import React, { useEffect, useState } from 'react'
import { useServer } from '../Context';
import { useParams } from 'react-router';
import axios from 'axios'
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { QRCodeSVG } from 'qrcode.react';

const Bookings = () => {
    const [booking,setBooking]=useState([]);
    const {BASE_URL} =useServer();
    const {userId}=useParams();

    useEffect(()=>{
      const fetchbookings=async()=>{
        try {
            const res=await axios.get(`${BASE_URL}api/booking/getbookingtouser/${userId}`);
            setBooking(res.data.booking)
            console.log(res.data.booking)
        } catch (error) {
            alert(error)
        }
      }
      if (userId) { // Only fetch if userId exists
    fetchbookings();
  }
    },[userId,BASE_URL])


  return (
   <div className='flex flex-col'>
    <Nav/>
   
    <div className='flex flex-col p-6'>
      <h1 className='text-3xl font-semibold text-center'>Tickets</h1>
      <div className='flex flex-col p-6   font-mono gap-2 justify-center items-center'>
        {booking.map(((book)=>(
        <div key={book._id} className='flex flex-col border border-black gap-2 w-[300px] p-2'>
            <p className='text-lg font-bold text-center'>booking details</p>
               <p className='font-semibold'>Booking Person name: <span className='font-normal'>{book.userId.fullname}</span> </p>
               <p className='font-smibold'>Date of travel:  <span className='font-normal'>{new Date(book.travelDate).toLocaleDateString()}</span> </p>
               <p className='font-semibold'>Bus name: <span className='font-normal'> {book.busId.busname}</span> </p>
               <p className='font-semibold'>No of seat booked: <span>{book.seats.length}</span> </p>
               <p className='flex flex-row gap-2'>Seat no: {book.seats.map(m=>(
                <p className='px-1 text-white bg-gray-400'>{m}</p>
             ))}</p>

             <div className="flex flex-col items-center border-l pl-6">
              <QRCodeSVG 
                value={book._id
                }

              
                size={100}     
                level={"H"}   
                marginSize={2}
              />
              <span className="text-[10px] mt-2 text-gray-400 font-mono">{book._id}</span>
            </div>


            <div className='flex flex-col gap-2'>
                <h1>Important Travel Instructions</h1>
                <p className='text-xs'>Identification: Please carry a valid Govt. issued Photo ID (Aadhar, PAN, or Passport) during boarding.</p>
                <p className='text-xs'>Reporting Time: Arrive at the boarding point at least 15–20 minutes before the scheduled departure.</p>
                <p className='text-xs'>M-Ticket: Show the QR Code on your phone to the conductor for digital verification.</p>
                <p className='text-xs'>Luggage: Maximum 15kg of luggage is allowed per passenger. Fragile items are carried at the owner's risk.</p>
            </div>


        </div>
      )))}
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Bookings
