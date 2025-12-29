import React from 'react'
import logo from '../assets/buslogo3.png'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";


const Footer = () => {
  return (
    <div className='flex flex-col '>
      <div className='flex flex-col sm:flex-row w-full h-auto sm:h-[100px] sm:h-[200px] bg-gray-700 p-15 gap-5 sm:gap:0 sm:p-10 justify-between '>
        <div className='flex flex-col  sm:flex-col sm:ml-10 gap-3 justify-center'>
         <img src={logo} alt="" className='w-10 sm:w-20 rounded-lg shadow-lg h-10 sm:h-15 ml-2 '/>
          <p className='text-xs font-semibold text-gray-300'>Your journey is our priority</p>
          <div className='flex flex-row gap-4  text-gray-300' >
           <FaInstagram />
           <FaWhatsapp />
           <SiGmail/>
           <BsTwitterX/>
          </div>

          
        </div>

         <div className='flex flex-col text-gray-400 font semibold gap-1'>
          <h1 className='text-lg font-bold text-orange-500 text-center'>Best Routes</h1>
          <p className='text-xs font-semibold'>Kochi to banglore</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to banglore</p>
          <p className='text-xs font-semibold'>kochi to chennai</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to chennai</p>
        </div>

        
        <div className='flex flex-col text-gray-400 font semibold gap-1'>
          <h1 className='text-lg font-bold text-orange-500 text-center'>Best Routes</h1>
          <p className='text-xs font-semibold'>Kochi to banglore</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to banglore</p>
          <p className='text-xs font-semibold'>kochi to chennai</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to chennai</p>
        </div>

         <div className='hidden sm:flex flex-col text-gray-400 font semibold gap-1'>
          <h1 className='text-lg font-bold text-orange-500 text-center'>Best Routes</h1>
          <p className='text-xs font-semibold'>Kochi to banglore</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to banglore</p>
          <p className='text-xs font-semibold'>kochi to chennai</p>
          <p className='text-xs font-semibold'>thiruvanathapuram to chennai</p>
        </div>
         
      </div>
      <div className='flex w-full h-[30px] bg-orange-500 justify-center items-center'>
          <p className='text-sm font-bold text-white'>All copyrights reserved @ goBus</p>
      </div>
    </div>
  )
}

export default Footer
