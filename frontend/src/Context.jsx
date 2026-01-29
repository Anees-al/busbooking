import { useContext,createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const ApiContext=createContext();


export const ApiProvider = ({ children }) => {
    // 1. Define your global base URL
    const BASE_URL = import.meta.env.VITE_BASE_URL 
    const [user,setUser]=useState(null);

    // 2. Create a configured axios instance
    const server = axios.create({
        baseURL: BASE_URL,
    });
    console.log(BASE_URL)
    


    useEffect(()=>{
    const fetchuser=async()=>{
        
        try {
            const savedId = localStorage.getItem("userId");
            if (!savedId) return;
            const res=await axios.get(`${BASE_URL}api/user/getuser/${savedId}`);

            if(res.data.success){
                setUser(res.data.users)
                
                
            }
        } catch (error) {
            console.log('something error',error)
        }
    }
    fetchuser()
    },[BASE_URL])
  

    return(
        <ApiContext.Provider value={{BASE_URL,server,user,setUser}}>
            {children}
        </ApiContext.Provider>
    )
}


export const useServer = () => useContext(ApiContext);

