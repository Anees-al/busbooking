import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from "react-icons/hi";
import buslogo from '../assets/buslogo3.png'
import { useNavigate } from 'react-router';
import {motion} from 'framer-motion'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <motion.nav className='bg-[#1b81e5] p-4 relative' initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}}>
      <div className='max-w-7xl mx-auto flex flex-row justify-between items-center'>
        
        {/* LOGO */}
        <img src={buslogo} alt=""  className='w-[60px] rounded-lg cursor-pointer' onClick={()=>navigate('/')}/>
        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <div className='hidden md:flex flex-row text-white font-semibold gap-10'>
          <p className='cursor-pointer hover:text-[#FF2A00]'>Home</p>
          <p className='cursor-pointer hover:text-[#FF2A00]'>Routes</p>
          <p className='cursor-pointer hover:text-[#FF2A00]'>Support</p>
          <p className='cursor-pointer hover:text-[#FF2A00]'>Bus</p> 
        </div>

        {/* LOGIN BUTTON & MOBILE ICON */}
        <div className='flex items-center gap-4'>
          <button className='px-4 py-1 bg-[#FF2A00] text-white font-bold rounded-lg cursor-pointer' onClick={()=>navigate('/login')}>Login</button>
          
          {/* HAMBURGER ICON (Visible only on Mobile) */}
          <button 
            className='md:hidden text-white cursor-pointer' 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Sliding Overlay) */}
      <div className={`absolute top-full left-0 w-full bg-[#5EAFFF] transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:hidden'}`}>
        <div className='flex flex-col items-center py-5 gap-6 text-white font-semibold'>
          <p className='cursor-pointer hover:text-[#FF2A00]' onClick={() => setIsOpen(false)}>Home</p>
          <p className='cursor-pointer hover:text-[#FF2A00]' onClick={() => setIsOpen(false)}>Routes</p>
          <p className='cursor-pointer hover:text-[#FF2A00]' onClick={() => setIsOpen(false)}>Support</p>
          <p className='cursor-pointer hover:text-[#FF2A00]' onClick={() => setIsOpen(false)}>Bus</p>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;