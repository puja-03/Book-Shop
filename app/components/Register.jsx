"use client"
import React from 'react';
import { HandleCreateAccount } from '../action';
import { z } from 'zod';
import Toast from "react-hot-toast"
import bcrypt from "bcryptjs"

const Register = async() => {
    let registerSchema = z.object({
        name: z.string({
            required_error:"user name is required",
            invalid_type_error:"user name is string"
        }),
        contact: z.number(),
        city: z.string({
            required_error:"user city is required",
            invalid_type_error:"user city is string"
        }),
        email: z.string({
            required_error:"user email is required",
            invalid_type_error:"user email is string"
        }).email(),
        password: z.string({
            required_error:"user password is required",
            invalid_type_error:"user password is string"
        }).min(5),
    })

    const handlecreateAccountClient = async (formData)=>{
        let name = formData.get("name");
        let contact = +formData.get("contact");
        let city = formData.get("city");
        let email = formData.get("email");
        let password = formData.get("password");

        let record = {name,contact,email,city,password }

        let data= registerSchema.safeParse(record);

        if(!data.success){
            data.error.issues.forEach((issue)=>{
                Toast.error(issue.path[0]+";"+issue.message)
            })
            return;
        }
        await HandleCreateAccount(formData)
    }
  return (
    <form action={handlecreateAccountClient} method="post" className=" p-5 rounded ">
    <div className="mb-3 flex flex-col gap-3">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" className="border text-black w-full rounded px-2 py-2" placeholder="enter your name"/>
    </div>
    <div className="mb-3 fl ex flex-col gap-3">
      <label htmlFor="contact">contact</label>
      <input type="text" id="contact" name="contact" className="border text-black rounded w-full px-2 py-2" placeholder="enter your contact"/>
    </div>
    <div className="mb-3 flex flex-col gap-3">
      <label htmlFor="city">city</label>
      <input type="text" id="city" name="city" className="border rounded text-black w-full px-2 py-2" placeholder="enter your city"/>
    </div>
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
  </form>  )
}

export default Register