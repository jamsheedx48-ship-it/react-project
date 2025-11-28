import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify';


const Login = () => {
  const navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const LoginValidation=(e)=>{
   e.preventDefault()

   if(!email.includes("@")){ 
   toast.error("Invalid email")
    return;
   }
   if(password.length<8){
    toast.error("Password must be at least 8 characters")
   return;
   }
   
   fetch("http://localhost:5000/users")
   .then((res)=>res.json())
   .then((data)=>{
     const olduser = data.find((user)=>user.email===email&&user.password===password)
     if(olduser){
      toast.success("login succes")
      localStorage.setItem("userid",olduser.id)
      navigate("/")
     }else{
      toast.error("incorrect email or password")
     }
   })
   
  }


  
  
  return (
    <>
      <div className='auth-container'>
         <form>
          <h2>Login</h2>

          <input
          type='email'
          placeholder='Email Address'
          required
          onChange={(e)=>setEmail(e.target.value)}
          />
          <br/><br/>
          <input
          type='password'
          placeholder='Password'
          required
          onChange={(e)=>setPassword(e.target.value)}
          />
          <br/><br/>
          <button onClick={LoginValidation}>Login</button>
           <p> <small>Don't have an account?</small> <Link to="/register"><span>Register</span></Link></p>
         </form>
      </div>
    </>
  )
}

export default Login