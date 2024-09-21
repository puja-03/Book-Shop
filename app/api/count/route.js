import Book from "@/app/models/Book";
import Category from "@/app/models/Category";
import DbConnect from "@/app/models/DbConnect";
import Order from "@/app/models/Order";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

 DbConnect();
export async function GET(req){
    let bookCount  = await Book.countDocuments();
    let userCount  = await User.countDocuments();
    let orderCount  = await Order.countDocuments();
    let categoryCount  = await Category.countDocuments();
    
     return NextResponse.json({bookCount,userCount,orderCount,categoryCount});
}