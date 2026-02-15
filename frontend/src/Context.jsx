import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const BASE_URL = "http://localhost:3000";

  const [user, setUser] = useState(null);

  
  const server = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
  });

  // PAYMENT 
  const startPayment = async ({ amount, onSuccess }) => {
    try {
      
      const { data: keyData } = await server.get(
        "/api/booking/getkey"
      );

       
      const { data: orderData } = await server.post(
        "/api/booking/process/payment",
        { amount }
      );

      const options = {
        key: keyData.key,
        amount,
        currency: "INR",
        name: "GoBus",
        description: "Bus Ticket Booking",
        order_id: orderData.order,

        
        handler: function (response) {
          if (onSuccess) {
            onSuccess(response);
          }
        },

        theme: {
          color: "#F37254",
        },
      };

      //  Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error.response?.data || error.message
      );
    }
  };

  // FETCH USER 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedId = localStorage.getItem("userId");
        if (!savedId) return;

        const res = await server.get(
          `/api/user/getuser/${savedId}`
        );

        if (res.data?.success) {
          setUser(res.data.users);
        }
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  // PROVIDER
  return (
    <ApiContext.Provider
      value={{
        BASE_URL,
        server,
        user,
        setUser,
        startPayment,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

//CUSTOM HOOK 
export const useServer = () => useContext(ApiContext);
