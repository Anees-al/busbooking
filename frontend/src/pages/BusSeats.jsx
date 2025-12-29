import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import bus12 from '../assets/bus12.png'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion'
import { useServer } from '../Context'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

const BusSeats = () => {
    const location = useLocation();
    const { BASE_URL } = useServer();
    const { id } = useParams();
    
    // Initialize state with location data if available, otherwise null
    const [busesseat, setBuses] = useState(location.state?.buses || null);

    useEffect(() => {
        const fetchbusid = async () => {
            try {
                const res = await axios.get(`${BASE_URL}api/bus/getbusbyid/${id}`);
                setBuses(res.data.buses);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        // Fetch if we don't have data or if the ID changed
        fetchbusid();
    }, [id, BASE_URL]);

    // 1. LOADING GUARD - This is critical!
    if (!busesseat) {
        return <div className='h-screen flex items-center justify-center font-bold text-xl'>Loading Bus Details...</div>;
    }

    // 2. CALCULATE DYNAMIC DATA (After loading guard)
    
    // Find Origin (First stop)
    const originStop = busesseat.stops[0];

    // Find Destination (Specific stop searched or last stop)
    const destinationStop = location.state?.searchQuery?.destination
        ? busesseat.stops.find(s => s.stationname.toLowerCase().includes(location.state.searchQuery.destination.toLowerCase()))
        : busesseat.stops[busesseat.stops.length - 1];

    // Use exact keys from your DB (Note: depaturetime typo)
    const startTime = originStop?.depaturetime; 
    const endTime = destinationStop?.arrivaltime;
    const finalPrice = destinationStop?.pricefromorgin || 0;

    // Financial calculations
    const GST = finalPrice * (5 / 100);
    const TotalPrice = finalPrice + GST;
    const bookedseats = ['L1', 'L2', 'L3']; // You can make this dynamic later

    return (
        <div className='bg-gray-200'>
            <Nav />
            <div className='flex flex-col'>
                <div className='flex flex-col sm:flex-row justify-center items-center min-h-[40vh] sm:min-h-[70vh]' style={{ backgroundImage: `url(${bus12})`, backgroundSize: 'cover' }}>
                </div>

                <motion.div className='flex flex-row p-10 rounded-lg' initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className='bg-orange-500 h-auto sm:h-[200px] w-2 rounded-l-lg shadow-lg'></div>

                    <div className='flex flex-col sm:flex-row bg-white w-auto gap-2 sm:w-[1400px] h-auto sm:h-[200px] p-8 justify-between rounded-r-lg shadow-lg'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-lg font-semibold text-gray-400'>Depature ➔ Arrival</p>
                            <p className='text-3xl font-bold text-gray-800'>
                                {startTime} ➔ {endTime}
                            </p>
                            <p className='text-lg font-semibold text-orange-600 uppercase mt-1'>
                                {busesseat.origin} ➔ {destinationStop?.stationname}
                            </p>
                            <div className='flex flex-row gap-2 mt-2'>
                                {busesseat.amenities?.map((am, index) => (
                                    <p key={index} className='bg-gray-200 text-sm px-2 py-1 rounded-lg font-semibold text-gray-500'>{am}</p>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col justify-center'>
                            <p className='text-4xl font-bold text-gray-800'>₹ {finalPrice}</p>
                            <p className='text-sm text-gray-400 font-bold'>per seat</p>
                        </div>

                        <div className='flex flex-col gap-1 text-right'>
                            <p className='text-3xl font-semibold text-orange-500'>
                                {busesseat.busname} 
                                <span className='text-sm text-gray-400 block'>{busesseat.busoperator}</span> 
                            </p>
                            <p className='text-lg text-gray-500 font-semibold'>
                                {busesseat.bustype} | {busesseat.isAC ? 'AC' : 'NON-AC'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className='flex flex-col sm:flex-row p-10 justify-between gap-8'>
                    {/* SEAT SELECTION AREA */}
                    <motion.div className='flex flex-col bg-white w-auto h-auto sm:w-[500px] sm:h-[600px] rounded-lg shadow-lg' initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
                        <div className='flex justify-end p-5'>
                            <p className='text-center p-5 border w-22 border-black font-black rounded-lg'>Driver</p>
                        </div>
                        <div className='flex flex-row justify-between w-full max-w-2xl mx-auto p-10 bg-gray-50 rounded-xl border border-gray-200'>
                            <div className='grid grid-cols-2 gap-4'>
                                {[...Array(14)].map((_, i) => (
                                    <button key={i} className='sm:h-12 h-7 w-7 sm:w-12 flex items-center justify-center bg-white border-2 border-green-500 text-green-700 font-bold rounded-md shadow-md hover:bg-green-500 hover:text-white transition-all cursor-pointer'>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <div className='grid grid-cols-3 gap-4'>
                                {[...Array(21)].map((_, i) => (
                                    <button key={i + 15} className='sm:h-12 h-7 w-7 sm:w-12 flex items-center justify-center bg-white border-2 border-green-500 text-green-700 font-bold rounded-md shadow-sm hover:bg-green-500 hover:text-white transition-all cursor-pointer'>
                                        {i + 15}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* BOOK SUMMARY AREA */}
                    <motion.div className='flex flex-col bg-white w-auto sm:w-[700px] h-auto sm:h-[600px] rounded-lg shadow-lg p-10' initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
                        <h1 className='text-3xl font-semibold text-gray-500'>Book Summary</h1>
                        <div className='flex flex-row gap-3 mt-10'>
                            <p className='text-lg font-semibold'>Selected seats:</p>
                            <div className='flex flex-row gap-3'>
                                {bookedseats.map((seats, index) => (
                                    <p key={index} className='text-sm text-white font-bold py-1 px-2 bg-green-400 rounded-lg shadow-lg shadow-gray-400'>{seats}</p>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col mt-10'>
                            <h1 className='text-lg font-semibold'>Passenger Details</h1>
                            <p className='font-bold text-gray-500'>Full name: Anees</p>
                            <p className='font-bold text-gray-500'>Phone number: 0029767896357</p>
                            <p className='font-bold text-gray-500'>Email: annfknk@gmail.com</p>
                        </div>

                        <div className='flex flex-col text-gray-600 gap-1 font-semibold mt-10'>
                            <p>Ticket Fare: <span className='text-lg text-black font-bold'>{finalPrice}</span> </p>
                            <p>GST amount (5%): <span className='text-lg text-black font-bold'>{GST.toFixed(2)}</span></p>
                            <p>Total per ticket:<span className='text-lg text-black font-bold'>{TotalPrice.toFixed(2)}</span></p>
                            <p>No of tickets: <span className='text-lg text-black font-bold'>{bookedseats.length}</span> </p>
                            <p>Grand total: <span className='text-2xl text-red-500 font-bold'>{(TotalPrice * bookedseats.length).toFixed(2)}</span></p>
                        </div>

                        <button className='text-center font-semibold text-xl mt-10 bg-orange-600 px-3 py-2 text-white rounded-lg shadow-lg cursor-pointer hover:bg-orange-700 hover:shadow-xl'>
                            Proceed payment
                        </button>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BusSeats;