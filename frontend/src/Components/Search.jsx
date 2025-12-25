import React from 'react';
import busimage from '../assets/volvobus.png';
import {motion} from 'framer-motion'

const Search = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${busimage})`,
    backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex justify-center items-center min-h-[500px] px-4"
    >
      <motion.form className="flex flex-col gap-4 w-full max-w-5xl p-4" initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}} >

        {/* FROM → TO SECTION */}
        <div className="flex flex-col md:flex-row items-center bg-white p-4 md:p-6 gap-4 md:gap-10 rounded-lg shadow-md">
          
          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">From</label>
            <input
              type="text"
              placeholder="Enter your boarding point"
              className="px-4 py-2 rounded-lg border border-gray-600 w-full"
            />
          </div>

          <p className="text-xl font-bold hidden md:block">TO</p>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Destination</label>
            <input
              type="text"
              placeholder="Enter your destination"
              className="px-4 py-2 rounded-lg border border-gray-600 w-full"
            />
          </div>
        </div>

        {/* DATE / TICKETS / CATEGORY */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-6 gap-4 rounded-lg shadow-lg">
          
          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Date</label>
            <input
              type="date"
              className="px-4 py-2 rounded-lg border border-gray-600 w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">No of Tickets</label>
            <input
              type="number"
              min="1"
              className="px-4 py-2 rounded-lg border border-gray-600 w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Category</label>
            <input
              type="text"
              placeholder="Sleeper / AC / Non-AC"
              className="px-4 py-2 rounded-lg border border-gray-600 w-full"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="text-xl bg-[#FF2A00] text-white py-2 rounded-lg font-semibold hover:bg-[#e62500] transition cursor-pointer">
          Search Buses
        </button>

      </motion.form>
    </div>
  );
};

export default Search;
