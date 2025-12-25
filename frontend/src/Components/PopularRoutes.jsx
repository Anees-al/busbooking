import React from 'react'
import bus2 from '../assets/bus2.jpg'
import bus4 from '../assets/bus4.png'
import bus3 from '../assets/bus3.png'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router'

const PopularRoutes = () => {
    const navigate=useNavigate()
  return (
    <div className='flex flex-col gap-10 mt-10 mb-10'>
       <motion.h1 className='text-xl ml-10 sm:text-3xl font-bold text-[#1b81e5]' initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}}>Popular Routes</motion.h1>
    <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>

        <motion.div className='flex flex-col border border-gray-500 px-4 py-2 rounded-lg text-white justify-between w-[300px] h-[150px] cursor-pointer' style={{backgroundImage:`url(${bus2})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}} onClick={()=>navigate('/buslist/route/Trivandrum to Bangalore')}>
            <div>
            <p className='font-semibold text-lg'>Thiruvanathapuram to Banglore</p>
            <p className='text-sm'>10 buses Available</p>
            </div>
            <p className='text-lg font-bold '>From ₹1000</p>
        </motion.div>
        <motion.div className='flex flex-col border border-gray-500 px-4 py-2 rounded-lg text-white justify-between w-[300px] h-[150px] cursor-pointer' style={{backgroundImage:`url(${bus4})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}} onClick={()=>navigate('/buslist/route/Kochi to Bangalore')}>
            <div>
                <p className='font-semibold text-lg'>Kochi to Banglore</p>
            <p className='text-sm'>10 buses Available</p>
            </div>
            <p className='text-lg font-bold '>From ₹1200</p>
        </motion.div>
        <motion.div className='flex flex-col border border-gray-500 px-4 py-2 rounded-lg text-white justify-between w-[300px] h-[150px] cursor-pointer' style={{backgroundImage:`url(${bus3})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}} onClick={()=>navigate('/buslist/route/Thiruvananthapuram to Chennai')}>
            <div>
                <p className='font-semibold text-lg'>Thiruvanathapuram to Chennai</p>
            <p className='text-sm'>10 buses Available</p>
            </div>
            <p className='text-lg font-bold'>From ₹1400</p>
        </motion.div>
    </div>
      
    </div>
  )
}

export default PopularRoutes
