
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import DbConnect from "@/app/models/DbConnect";
import bcrypt from "bcryptjs";

DbConnect();
export  const   POST = async(req)=>{


    const records = await req.json()
    let{email,password} = records;
    try{
        let user = await User.findOne({email});
        if(!user){
            return NextResponse.json({"msg":"invalid email"},{status:400})
        }
    
        let vailPassword = await bcrypt.compare(password,user.password);

        if(!vailPassword){
            return NextResponse.json({"msg":"invail Password"},{status:400})
        }
        let tokenData ={
            id:user._id,
            email:user.email,
            name:user.name,
        }
        let  token = JWT.sign(tokenData,"myproject",{expiresIn:"2h"})
        const response = NextResponse.json({"msg":"login successfully",success:true})
        response.cookies.set("token",token,{httpOnly:true})
        return response
    }
    catch(error){
    return NextResponse.json({"msg":error.message},{status:400})
    }
}