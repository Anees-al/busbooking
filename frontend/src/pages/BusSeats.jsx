import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';
import bus12 from '../assets/bus12.png';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { useServer } from '../Context';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BusSeats = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { BASE_URL, user, startPayment } = useServer();
  const { id } = useParams();

  const travelDate = location.state?.searchQuery?.date;

  // ---------- STATE ----------
  const [busesseat, setBuses] = useState(location.state?.buses || null);
  const [sheduled, setSheduled] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booking, setBooking] = useState(false);

  // ---------- FETCH BUS + SCHEDULE ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const busRes = await axios.get(
          `${BASE_URL}/api/bus/getbusbyid/${id}`
        );
        setBuses(busRes.data.buses);

        const scheduleRes = await axios.post(
          `${BASE_URL}/api/shedule/create`,
          { busId: id, travelDate }
        );
        setSheduled(scheduleRes.data.schedule);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [id, BASE_URL, travelDate]);

  // ---------- LOADING GUARD ----------
  if (!busesseat) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-xl">
        Loading Bus Details...
      </div>
    );
  }

  // ---------- DERIVED DATA (SAFE) ----------
  const originStop = busesseat.stops?.[0];

  const destinationStop = location.state?.searchQuery?.destination
    ? busesseat.stops.find((s) =>
        s.stationname
          .toLowerCase()
          .includes(
            location.state.searchQuery.destination.toLowerCase()
          )
      )
    : busesseat.stops[busesseat.stops.length - 1];

  const startTime = originStop?.depaturetime;
  const endTime = destinationStop?.arrivaltime;
  const finalPrice = destinationStop?.pricefromorgin || 0;

  const GST = finalPrice * 0.05;
  const TotalPrice = finalPrice + GST;
  const seatCount = selectedSeats.length;

  // ---------- SEAT CLICK ----------
  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  // ---------- BOOKING ----------
  const handleBooking = async () => {
    if (seatCount === 0) {
      return toast.error('Please select at least one seat');
    }

    if (!user?._id) {
      return toast.error('Please login first');
    }

    setBooking(true);

    const totalAmount = Math.round(
      TotalPrice * seatCount * 100
    ); // paise

    startPayment({
      amount: totalAmount,

      onSuccess: async (paymentResponse) => {
        try {
          const bookingData = {
            busId: id,
            userId: user._id,
            sheduledId: sheduled._id,
            seats: selectedSeats,
            travelDate,
            paymentId: paymentResponse.razorpay_payment_id,
          };

          const res = await axios.post(
            `${BASE_URL}/api/booking/createbooking`,
            bookingData
          );

          if (res.status === 200) {
            toast.success('Booking Successful 🎉');
            navigate(`/bookings/${user._id}`);
          }
        } catch (error) {
          toast.error('Booking failed after payment');
        } finally {
          setBooking(false);
        }
      },
    });
  };

  // ---------- UI ----------
  return (
    <div className="bg-gray-200">
      <Nav />

      <div
        className="min-h-[40vh] sm:min-h-[70vh]"
        style={{
          backgroundImage: `url(${bus12})`,
          backgroundSize: 'cover',
        }}
      />

      {/* BUS INFO */}
      <motion.div
        className="flex p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-blue-400 w-full p-8 rounded-lg shadow-lg flex justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">
              {startTime} ➜ {endTime}
            </h2>
            <p className="text-orange-200">
              {busesseat.origin} ➜ {destinationStop?.stationname}
            </p>
          </div>

          <div className="text-white text-right">
            <p className="text-3xl font-bold">₹ {finalPrice}</p>
            <p>{busesseat.busname}</p>
          </div>
        </div>
      </motion.div>

      {/* SEATS */}
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto p-5 bg-white rounded-xl">
        {sheduled?.seats?.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatNumber);
          return (
            <button
              key={seat._id}
              disabled={seat.isBooked}
              onClick={() => handleSeatClick(seat.seatNumber)}
              className={`h-12 w-12 rounded-md font-bold
                ${
                  seat.isBooked
                    ? 'bg-gray-300'
                    : isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-green-100'
                }`}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Summary</h2>

        <p>Name: {user?.fullname}</p>
        <p>Email: {user?.email}</p>

        <p className="mt-4">
          Total: ₹ {(TotalPrice * seatCount).toFixed(2)}
        </p>

        <button
          onClick={handleBooking}
          disabled={booking}
          className="mt-6 w-full bg-orange-600 text-white py-2 rounded"
        >
          {booking ? 'Processing...' : 'Proceed Payment'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default BusSeats;
