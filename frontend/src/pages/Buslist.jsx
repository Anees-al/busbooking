import React from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import bus12 from '../assets/bus12.png'
import  {motion} from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useServer } from '../Context'
const Buslist = () => {

    const {server}=useServer()

     const location=useLocation();
     const navigate =useNavigate()
    const {routePath,busoperator}=useParams();
    const [buses,setBus]=useState(location.state?.buses || []);
    console.log("Navigation State:", location.state);
   
useEffect(() => {
        // Only fetch from API if we DON'T have search results from the previous page
        if (!location.state?.buses) {
            const fetchBuses = async () => {
                try {
                    let url = "";
                    if (routePath) {
                        url = `/api/bus/getroutebybus/${routePath}`;
                    } else if (busoperator) {
                        url = `/api/bus/getbusesbyoperator/${busoperator}`;
                    }

                    if (url) {
                        const res = await server.get(url);
                        // Make sure this matches your backend response key (res.data.buses or res.data.data)
                        setBus(res.data.buses || res.data.data);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            };
            fetchBuses();
        }
    }, [routePath, busoperator, location.state]);

    

     
  return (
    <div>
        <Nav/>
        <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row justify-center items-center  min-h-[40vh] sm:min-h-[70vh]'style={{backgroundImage:`url(${bus12})`, backgroundSize:'cover',}}>
                <div>
                    <p className='text-3xl font-bold text-white'>
                        Trivandrum to Banglore
                    </p>
                    <p className=' font-semibold text-white'>26 december 2026 | 10 buses</p>
                </div>
                <button className='text-sm mt-20 sm:mt-0 font-bold text-white bg-orange-600 rounded-sm px-4 py-2 cursor-pointer sm:ml-20'>
                    Modify Search
                </button>
            </div>

            
            <div className=' flex flex-col bg-gray-100  sm:flex-row py-5 px-2  sm:py-10 px-1 sm:px-20'>
               <div className='sm:hidden  flex flex-col bg-white h-auto w-auto shadow-sm border border-blue-500 shadow-blue-300 p-2 tounded-lg '>
                <p className='text-2xl font-bold text-blue-600 text-center'>Filters</p>
                <div className='flex flex-row gap-5'>
                        <p className='text-sm font-black text-black '>Bus type</p>

                        <div className="flex flex-row gap-3">
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-1 text-sm text-gray-600">Sleeper</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-1 text-sm text-gray-600">Semi-Sleeper</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-1 text-sm text-gray-600">Seater</span>
            </label>
        </div>
                    </div>

                     <div className='flex flex-row gap-5'>
                        <p className='text-sm font-black text-black '>Air Conditioning</p>

                        <div className="flex flex-row gap-3">
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-1 text-sm text-gray-600">AC</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-1 text-sm text-gray-600">NON-AC</span>
            </label>
            
            
        </div>
                    </div>






 
            </div>


                  <div className='hidden sm:flex flex-col w-[300px] h-[400px] bg-white px-10 py-5'>
                    <p className='text-2xl font-bold text-blue-600 text-center'>Filters</p>

                    <hr className='border border-gray-200 mt-10'/>

                    <div className='flex flex-col gap-5'>
                        <p className='text-xl font-bold text-black  mt-5'>Bus type</p>

                        <div className="flex flex-col gap-3">
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-3 text-sm text-gray-600">Sleeper</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-3 text-sm text-gray-600">Semi-Sleeper</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-3 text-sm text-gray-600">Seater</span>
            </label>
        </div>
                    </div>





                     <div className='flex flex-col gap-5'>
                        <p className='text-xl font-bold text-black  mt-5'>Air Conditioning</p>

                        <div className="flex flex-col gap-3">
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-3 text-sm text-gray-600">AC</span>
            </label>
            
            <label className="flex items-center cursor-pointer hover:text-orange-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded" />
                <span className="ml-3 text-sm text-gray-600">Non-AC</span>
            </label>
            
            
        </div>
                    </div>

                  </div>


                  <div className='flex flex-col p-5 sm:p-15 gap-5'>
                   {buses.length > 0 ? (
    buses.map((bus, index) => (
      <motion.div 
        key={bus._id || index} 
        className='flex flex-row h-auto sm:h-[300px] sm:w-[1000px] border border-orange-500 sm:border-none shadow-lg hover:shadow-orange-500 hover:shadow-md' 
        initial={{x:-100, opacity:0}} 
        whileInView={{x:0, opacity:1}} 
        transition={{duration:0.5}}
      >
        <div className='flex bg-orange-500 h-full w-2 '></div>
        <div className='flex flex-col bg-white w-full h-full py-5 px-10'>
          <div className='flex flex-col  sm:flex-row justify-between p-2'>
            <p className='text-2xl sm:text-xl text-center sm:text-start font-bold'>{bus.busname}</p>
          <p className='text-xs font-semibold text-red-600'>{bus.routePath}</p>
          </div>
         
          <p className='text-lg font-semibold text-red-600 uppercase mt-3'>
        {location.state?.searchQuery 
            ? `${location.state.searchQuery.from} ➔ ${location.state.searchQuery.destination}`
            : bus.routePath}
    </p>
          
          <div className='flex flex-row text-sm text-gray-500 font-semibold mt-1'>
            <p className=''>{bus.bustype} |</p>
            <p className='ml-1'>{bus.isAC ? 'AC' : 'NON-AC'}</p>
          </div>

          <div className='flex flex-row gap-3 mt-2 flex-wrap'>
            {bus.amenities?.map((amt, i) => (
              <p key={i} className='px-2 py-1 bg-gray-100 rounded-lg text-gray-600 text-xs w-auto'>
                {amt}
              </p>
            ))}
          </div>

          {/* Optional Chaining for stops to prevent crash if stops is missing */}
          <p className='text-2xl font-semibold text-orange-500 mt-5'>
             ₹ {
        // If it's a search, find the price for the specific destination searched
        location.state?.searchQuery 
        ? bus.stops.find(s => s.stationname === location.state.searchQuery.destination)?.pricefromorgin 
          || bus.stops[bus.stops.length - 1]?.pricefromorgin // fallback to last stop
        : bus.stops[bus.stops.length - 1]?.pricefromorgin // default for route links
    }
          </p>
          
          <p className='text-lg font-semibold text-green-600'>
            {bus.totalseats - (bus.bookseats ? bus.bookseats.length : 0)} seats left
          </p>
          

          <button className='text-lg bg-blue-500 text-white py-2 rounded-lg mb-5 font-semibold shadow-lg mt-auto cursor-pointer' onClick={()=>navigate(`/seatbook/${bus._id}`,{state:{searchQuery: location.state?.searchQuery,buses:bus}})} >
            Book seats
          </button>
        </div>
      </motion.div>
    ))
  ) : (
    /* 2. Show this if buses array is empty */
    <div className='flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md w-full sm:w-[1000px]'>
       <p className='text-xl font-bold text-gray-400'>No buses found in this case</p>
       <p className='text-gray-400'>Try changing your search filters or destination.</p>
    </div>
  )}
                  </div>
            </div>

        </div>
       <Footer/>
    </div>
   
  )
}

export default Buslist
