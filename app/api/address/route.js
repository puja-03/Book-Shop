import DbConnect from "@/app/models/DbConnect";
import OrderItem from "@/app/models/OrderItem";
import JWT from "jsonwebtoken"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Address from "@/app/models/Address";

 
 export const  GET = async (req,res)=>{
    await DbConnect();
    let token = cookies().get("token")

    let user = JWT.verify(token.value,"myproject")
 
     
   let address = await Address.find({user:user.id})
     
    return NextResponse.json({address})
 }