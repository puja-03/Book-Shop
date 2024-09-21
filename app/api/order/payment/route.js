import DbConnect from "@/app/models/DbConnect";
import Order from "@/app/models/Order";
import JWT from "jsonwebtoken"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const  PUT = async (res)=>{

    await DbConnect();
    let token = cookies().get("token")
    let user = JWT.verify(token.value,"myproject")
   let order = await Order.findOneAndUpdate({userId:user.id ,ordered:false},{ordered:true})
     if(!order){
        return NextResponse.json({msg:"order not found"},{status:400})
     }
    
    return NextResponse.json({order})
}