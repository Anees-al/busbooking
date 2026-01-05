import React from 'react'
import { useState } from 'react'
import { useServer } from '../Context'
import AdminNav from '../Components/AdminNav'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserListAdmin = () => {
    const [user,setUsers]=useState([]);
    const {BASE_URL}=useServer()


    useEffect(()=>{
   const fetchUsers=async()=>{
    try {
        const res=await axios.get(`${BASE_URL}api/user/getallusers`);
        setUsers(res.data.users);
        toast.success('successfully fetched user data')
    } catch (error) {
       toast.error(error.message) 
    }
   }

   fetchUsers();
    },[])
  return (
    <div className='flex flex-col gap-3'>
        <AdminNav/>
     <div className='flex flex-col p-4'>
         <h1 className='text-3xl font-semibold font-mono '>All users details</h1>
           <div className='flex flex-row border border-black p-4 font-mono gap-5 mb-10 bg-black text-white'>
             <p className='w-[300px]'>Full name</p>
             <p className='w-[300px]'>Phone</p>
             <p className='w-[300px]'>Email</p>
             <p className='w-[300px]'>Role</p>
           </div>
      <div className='flex flex-col gap-3'>
        {user.map((u)=>u.role==='user'?(
            
            <div className='flex flex-row border border-black p-4 font-mono gap-5 '>
               <p  className='w-[300px]'>{u.fullname}</p>
               <p  className='w-[300px]'>{u.phone}</p>
               <p  className='w-[300px]'>{u.email}</p>
               <p  className='w-[300px]'>{u.role}</p>
            </div>
        ):(
            
            <div className='flex flex-row border border-black bg-blue-600 text-white font-semibold p-4 font-mono gap-5 '>
               <p  className='w-[300px]'>{u.fullname}</p>
               <p  className='w-[300px]'>{u.phone}</p>
               <p  className='w-[300px]'>{u.email}</p>
               <p  className='w-[300px]'>{u.role}</p>
            </div>
        ))}
      </div>
     </div>
    </div>
  )
}

export default UserListAdmin
