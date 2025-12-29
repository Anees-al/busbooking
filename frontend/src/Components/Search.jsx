import React, { useState } from 'react';
import busimage from '../assets/volvobus.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useServer } from '../Context';

const Search = () => {
  const [formData, setFormData] = useState({
    from: '',
    destination: '',
    category: 'All', // Default to All
    date: ''
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { server } = useServer();

  // Get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Your backend now checks daysAvailable based on this date!
      const res = await server.post('/api/bus/search', formData);
      
      navigate('/buslist', { 
        state: { 
          buses: res.data.data, 
          searchQuery: formData 
        } 
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${busimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex justify-center items-center min-h-[500px] px-4"
    >
      <motion.form 
        className="flex flex-col gap-4 w-full max-w-5xl p-4" 
        onSubmit={handleSearch} 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        {/* FROM → TO SECTION */}
        <div className="flex flex-col md:flex-row items-center bg-white p-4 md:p-6 gap-4 md:gap-10 rounded-lg shadow-md">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">From</label>
            <input
              type="text"
              name='from'
              required
              onChange={handleChange}
              placeholder="Enter boarding point"
              className="px-4 py-2 rounded-lg border border-gray-400 w-full focus:border-[#FF2A00] outline-none"
            />
          </div>

          <p className="text-xl font-bold hidden md:block text-gray-400">TO</p>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Destination</label>
            <input
              type="text"
              name='destination'
              required
              onChange={handleChange}
              placeholder="Enter destination"
              className="px-4 py-2 rounded-lg border border-gray-400 w-full focus:border-[#FF2A00] outline-none"
            />
          </div>
        </div>

        {/* DATE / CATEGORY SECTION */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-6 gap-4 rounded-lg shadow-lg">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Date</label>
            <input
              type="date"
              name='date'
              min={today} // Prevents past date selection
              required
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-400 w-full focus:border-[#FF2A00] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-lg font-bold">Category</label>
            <select
              name='category'
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-400 w-full focus:border-[#FF2A00] outline-none"
            >
              <option value="All">All Types</option>
              <option value="sleeper">Sleeper</option>
              <option value="semi-sleeper">Semi-Sleeper</option>
              <option value="seater">Seater</option>
            </select>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          disabled={loading}
          className={`text-xl ${loading ? 'bg-gray-400' : 'bg-[#FF2A00]'} text-white py-2 rounded-lg font-semibold hover:bg-[#e62500] transition cursor-pointer`}
        >
          {loading ? 'Searching...' : 'Search Buses'}
        </button>
      </motion.form>
    </div>
  );
};

export default Search;