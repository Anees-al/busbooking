import React from 'react'
import Nav from '../Components/Nav'
import Search from '../Components/Search'
import { FaCircleCheck } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import PopularRoutes from '../Components/PopularRoutes';
import { CgViewComfortable } from "react-icons/cg"
import Footer from '../Components/Footer';
import BusBysrtc from '../Components/BusBysrtc';

const Home = () => {
  return (
    <div>
        <Nav/>
        <Search/>
        <div className='hidden sm:flex flex-row justify-between bg-blue-100 p-3 px-[150px]'>
            <div className='flex flex-row gap-2'>
                  <FaCircleCheck color='green' size={30} className='mt-3'/>
                <div>
                    <p className='text-lg font-bold'>Easy booking</p>
                    <p className='text-sm font-semibold text-gray-600'>Quick and Secure Reservation</p>
                </div>
            </div>
             <div className='flex flex-row gap-2'>
                  <FaMoneyCheck color='green' size={30} className='mt-3'/>
                <div>
                    <p className='text-lg font-bold'>Best Price</p>
                    <p className='text-sm font-semibold text-gray-600'>Exclusive Discounts and offers</p>
                </div>
            </div>
             <div className='flex flex-row gap-2'>
                  <CgViewComfortable color='green' size={35} className='mt-3'/>
                <div>
                    <p className='text-lg font-bold'>Comfortable Ride</p>
                    <p className='text-sm font-semibold text-gray-600'>Premium and Budject buses</p>
                </div>
            </div>
        </div>
        <PopularRoutes/>
        <div className='hidden sm:flex flex-col  p-14 bg-blue-100'>
           <h1 className='text-2xl font-black text-blue-700'>Why Book With Us ?</h1>

           <div className='flex flex-row gap-10'>
         <div className='flex flex-row gap-10 mt-10'>
              <div className='flex flex-row px-6 py-1 bg-white w-[300px] h-[100px] justify-center items-center shadow-lg '>
                <img src="" alt="" />
                <div>
                    <p className='text-xl font-bold'>Trusted service</p>
                    <p className='text-sm text-semibold text-gray-500'>100% Reliable Operators</p>
                </div>
              </div>
           </div>



           <div className='flex flex-row gap-10 mt-10'>
              <div className='flex flex-row px-6 py-1 bg-white w-[300px] h-[100px] justify-center items-center shadow-lg '>
                <img src="" alt="" />
                <div>
                    <p className='text-xl font-bold'>Free Cancelation</p>
                    <p className='text-sm text-semibold text-gray-500'>Cancelation without extra fee</p>
                </div>
              </div>
           </div>



           <div className='flex flex-row gap-10 mt-10'>
              <div className='flex flex-row px-6 py-1 bg-white w-[300px] h-[100px] justify-center items-center shadow-lg '>
                <img src="" alt="" />
                <div>
                    <p className='text-xl font-bold'>24/7 Support</p>
                    <p className='text-sm text-semibold text-gray-500'>We are there to Help Anytime</p>
                </div>
              </div>
           </div>



           <div className='flex flex-row gap-10 mt-10'>
              <div className='flex flex-row px-6 py-1 bg-white w-[300px] h-[100px] justify-center items-center shadow-lg '>
                <img src="" alt="" />
                <div>
                    <p className='text-xl font-bold'>Secure Payments</p>
                    <p className='text-sm font-semibold text-gray-500'>Safe and Convenient Transaction</p>
                </div>
              </div>
           </div>
           </div>
           
        </div>
        <BusBysrtc/>

        <div className='sm:hidden  flex flex-col p-6' >
          <h1 className='text-2xl font-black text-blue-700'>Why Book With Us ?</h1>
           <div className='flex flex-col text-gray-600 text-xs'>
           <p>Below are some of the reasons why you should choose GoBus for booking bus tickets. </p>

           <ul className='mt-5 list-disc pl-5 '>
            <li>Free Cancelation:Cancel bus tickets without paying cancellation charges.</li>
            <li>24/7 Customer Support -Receive 24/7 customer service for any assistance related to bookings.</li>
            <li>Instant Refund - Get an instant refund for cancellation or booking-related issues. </li>
            <li>Earn Rewards - Refer your friend and get INR 100 in your redBus wallet after they complete their first trip. </li>
           </ul>
           </div>
          
        </div>
      <Footer/>
    </div>
  )
}

export default Home
