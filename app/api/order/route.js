import DbConnect from "@/app/models/DbConnect";
import Order from "@/app/models/Order";
import OrderItem from "@/app/models/OrderItem";
import JWT from "jsonwebtoken"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { record } from "zod";

 
 export const  GET = async (req,res)=>{
    await DbConnect();
    let token = cookies().get("token")
    let user = JWT.verify(token.value,"myproject")
 
    let order;
    order = await Order.findOne({userId:user.id ,ordered:false})
     if(!order){
        return NextResponse.json({msg:"order not found"},{status:400})
     }
    let orderItems = await OrderItem.find({orderId:order._id,userId:user.id}).populate(["bookId","userId","orderId"])
    return NextResponse.json({orderItems,})
 }

 export const  PUT = async (res)=>{
   await DbConnect();
   let record = await res.json();
   let token = cookies().get("token")
   let user = JWT.verify(token.value,"myproject")
   let {address} = record
  let order = await Order.findOneAndUpdate({userId:user.id ,ordered:false},{address})
    if(!order){
       return NextResponse.json({msg:"order not found"},{status:400})
    }
   
   return NextResponse.json({order})
}