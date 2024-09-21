"use client"
import Toast from "react-hot-toast"
import React from 'react'
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    let router = useRouter();
    const handleLoginClientAction = async(formdata)=>{
        let records ={
            email:formdata.get("email"),
            password:formdata.get("password")
        };
         let data = await fetch("http://localhost:3000/api/login",
         {method:"POST",
         body: JSON.stringify(records),
         headers:{
            "content-Type":"application/json"
         }
        })
         let res =  await data.json();
    
        if(!res.success){
         Toast.error(res.msg)
        }
        if(res.success){
           router.push("/");
           }
    } 
return (
    <form action= {handleLoginClientAction} method="post" className=" p-5 rounded ">
    
    <div className="mb-3 flex flex-col gap-3">
      <label htmlFor="email">email</label>
      <input type="text" id="email" name="email" className="border text-black rounded w-full px-2 py-2" placeholder="enter your email"/>
    </div>
    <div className="mb-3 flex flex-col gap-3">
      <label htmlFor="email">password</label>
      <input type="text" id="password" name="password" className="border text-black rounded w-full px-2 py-2" placeholder="enter your email"/>
    </div>
    <div className="mb-3 flex flex-1">
      <button type="submit" className="bg-red-500 rounded text-white px-3 py-3 w-full">create Record</button>
    </div>
    <a href='/register'>create an account</a>
  </form>  )
}

export default LoginForm