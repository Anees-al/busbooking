import { useContext,createContext } from "react";
import axios from "axios";


const ApiContext=createContext();


export const ApiProvider = ({ children }) => {
    // 1. Define your global base URL
    const BASE_URL = "http://localhost:3000/";

    // 2. Create a configured axios instance
    const server = axios.create({
        baseURL: BASE_URL,
    });
  

    return(
        <ApiContext.Provider value={{BASE_URL,server}}>
            {children}
        </ApiContext.Provider>
    )
}


export const useServer = () => useContext(ApiContext);

