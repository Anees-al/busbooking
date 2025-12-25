import React from 'react'
import keralasrtc from '../assets/ksrtc_kerala.jpg'
import karnataka from '../assets/ksrtc_karnataka.jpg'
import tamilnadu from '../assets/TNSTC.jpg'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router'
const BusBysrtc = () => {
  const navigate=useNavigate()
  return (
    <div className='fle flex-col px-10 mt-5 mb-5'>
      <motion.h1 className='text-lg sm:text-2xl font-bold text-blue-700' initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}}>Bus by SRTC <span className='text-sm text-gray-500' > (state transport corporation)</span> </motion.h1>


      <div className='flex flex-col sm:flex-row gap-10 mt-3 justify-center '>
           <motion.div className='flex flex-col justify-end p-4 border border-gray-600 w-[300px] h-[250px] rounded-lg' style={{backgroundImage:`url(${keralasrtc})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}}>
            <p className='text-xl font-semibold text-white'>Kerala SRTC</p>
            <p className='text-sm font-semibold text-white'>Kerala state road transport corporation</p>
            <button className='text-lg px-4 py-2 rounded-lg text-white bg-orange-700 w-32 mt-4 cursor-pointer' onClick={()=>navigate('/buslist/operator/KSRTC (Kerala)')}>Book Now</button>
           </motion.div>
           <motion.div className='flex flex-col justify-end p-4 border border-gray-600 w-[300px] h-[250px] rounded-lg' style={{backgroundImage:`url(${karnataka})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}}>
            <p className='text-xl font-semibold text-white'>Karnataka SRTC</p>
            <p className='text-sm font-semibold text-white'>Karnataka state road transport corporation</p>
            <button className='text-lg px-4 py-2 rounded-lg text-white bg-orange-700 w-32 mt-4 cursor-pointer' onClick={()=>navigate('/buslist/operator/Karnataka SRTC')}>Book Now</button>
           </motion.div>
           <motion.div className='flex flex-col justify-end p-4 border border-gray-600 w-[300px] h-[250px] rounded-lg' style={{backgroundImage:`url(${tamilnadu})`,backgroundSize:'cover'}} initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.7}}>
            <p className='text-xl font-semibold text-white'>TNSTC</p>
            <p className='text-sm font-semibold text-white'>Tamil Nadu state transport corporation</p>
            <button className='text-lg px-4 py-2 rounded-lg text-white bg-orange-700 w-32 mt-4 cursor-pointer' onClick={()=>navigate('/buslist/operator/TNSTC')} >Book Now</button>
           </motion.div>
      </div>
    </div>
  )
}

export default BusBysrtc
