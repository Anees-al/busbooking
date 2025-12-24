import React, { useState } from 'react'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'
import busimage from '../assets/volvobus.png';
import axios from 'axios'
import {toast} from 'react-toastify'
import  {motion} from 'framer-motion'
const Login = () => {

    const [login,setlogin]=useState('login');
    const[formdata,setFormdata]=useState({
      fullname:'',
      email:'',
      phone:'',
      password:'',
      confirmpassword:''
    })



    const handleInputChange=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }




    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
       let url= login==='login'?"http://localhost:3000/api/user/login":"http://localhost:3000/api/user/createuser" ;
        const res=await axios.post(url,formdata);
          
        setFormdata({
      fullname: "",
      email: "",
      phone:"",

      password: "",
      confirmpassword:''

      
    });

    toast.success('successfully created')
      } catch (error) {
          console.log("Error Message:", error.response?.data?.message);
      }
    }
    
    
  const handlechange=()=>{
    if(login==='login'){
      setlogin('signup')
    }else{
      setlogin('login')
    }
    
  }
  return (
    <div className='bg-gray-200'>
        <Nav/>
       <div className='flex flex-col jusify-center items-center min-h-screen p-12'style={{
        backgroundImage: `url(${busimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
               <motion.div className='flex flex-col   bg-white text-gray-500 rounded-lg w-auto border border-gray-400 mt-30 py-5 px-1 sm:px-7 shadow-lg' initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:16}}>
                   {login==='login'?<h1 className='text-center text-2xl font-semibold text-blue-600'>login</h1>:<h1 className='text-center text-2xl font-semibold text-blue-600'>sign up</h1>}
                  {login==='login'?  <p className='text-sm  font-semibold text-center'>Log in your account to book bus ticket</p>:<p className='text-sm  font-semibold text-center'>Create your account to book your bus ticket</p>}
                   <hr  className='mt-2 border border-gray-300 w-[300px] border-center ml-5'/>


                   <form className='flex flex-col gap-3 px-5 py-2' onSubmit={handleSubmit}>
                    {login==='login'?'':<input type="text"  placeholder='Full Name' name='fullname' value={formdata.fullname} className='p-2 w-[300px] border border-gray-500 rounded-sm t' onChange={handleInputChange} />}
                    <input type="email"  placeholder='Email Address' name='email' value={formdata.email} className='p-2 w-[300px] border border-gray-500 rounded-sm' onChange={handleInputChange} />
                    {login==='login'?'':<input type="tel"  name='phone' value={formdata.phone}  placeholder='Phone Number' className='p-2 w-[300px] border border-gray-500 rounded-sm' onChange={handleInputChange} />}
                    <input type="password"   placeholder='Password' value={formdata.password} name='password' className='p-2 w-[300px] border border-gray-500 rounded-sm' onChange={handleInputChange} />
                     {login==='login'?'':<input type="password" name='confirmpassword' value={formdata.confirmpassword}   placeholder='Conform Password' className='p-2 w-[300px] border border-gray-500 rounded-sm' onChange={handleInputChange}/>}
                     <div className='flex flex-row gap-2'>
                        <input type="checkbox" name="" id="" />
                        <p className='text-xs text-gray-600 font-semibold'>I agree to the Terms and Conditions and Privacy Policy</p>
                     </div>
                     {login==='login'?<button className='text-lg font-semibold text-white bg-orange-500 py-1 rounded-lg' >Log In</button>:<button className='text-lg font-semibold text-white bg-orange-500 py-1 rounded-lg'>Sign Up</button>}
                     

                   </form>
                  {login==='login'? <p className='text-sm font-semibold text-gray-600 teext-center text-center'>If you have no account?<button className='text-blue-500 ml-2' onClick={()=>handlechange()}>Sign up</button> </p>: <p className='text-sm font-semibold text-gray-600 teext-center text-center'>Already have an Account ?<button className='text-blue-500 ml-2' onClick={()=>handlechange()}>Login</button> </p>}

               </motion.div>
       </div>


        <Footer/>
      
    </div>
  )
}

export default Login
