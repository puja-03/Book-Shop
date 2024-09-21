"use client"
import  Toast  from "react-hot-toast"

import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import {useRouter } from "next/navigation";

const CartPage = () => {
  let router = useRouter()
  let [orderItems ,setOrderItems] = useState([]);
  let [refresh ,setRefresh] = useState(false)

  useEffect(()=>{
    let callinaData = async ()=>{
     try{
       const orderData = await fetch("http://localhost:3000/api/order",{cache:"no-cache"});
      const res = await  orderData.json();
      setOrderItems(res.orderItems)
     }
     catch(error){
       console.error("error fetching data",error)
     }
    }
    callinaData();
  },[refresh])
  const addMoreQty = async (id)=>{
    let data= await fetch(`http://localhost:3000/api/cart/add/${id}`)
    let res = await data.json();
    setRefresh(!refresh)
  }
  const minusQty = async (id)=>{
    let data= await fetch(`http://localhost:3000/api/cart/minus/${id}`)
    let res = await data.json();
    setRefresh(!refresh)
  }
  /// for total work
   const totalAmount = orderItems?.reduce((acc, orderItem)=>{
    return acc + orderItem.bookId.price*orderItem.quantity;
   },0);

   const totalDiscountlAmount = orderItems?.reduce((acc, orderItem)=>{
    return acc + orderItem.bookId.dprice*orderItem.quantity;
   },0);

   const DiscountlAmount = totalAmount - totalDiscountlAmount;
   const taxAmount = totalDiscountlAmount *0.18;
    const totalPayableAmount = totalDiscountlAmount+taxAmount;
  return (
    < >
    <div className="flex flex-1 my-4">
        <h1 className='text-2xl font-semibold'>Your Cart({orderItems?.length ?? "0"})</h1>
      </div>
        <div className="flex flex-1 gap-2">
        <div className="w-4/6 h-36 gap-3">
          {!orderItems && <h1 className="text-3xl text-slate-900 font-sans">Cart Emmpty</h1>}
          {
            orderItems &&
            orderItems.map((orderItems,i) =>(
            <div key={i} className="flex border shadow rounded bg-white p-4 mb-3">
            <div className="w-2/12">
              <img alt="" className='w-full h-[170px] object-cover' src={`/book/${orderItems.bookId.cover_image}`}/>
            </div>
            <div className="w-10/12 p-6">
              <div className="flex flex-col">
                <h2 className='text-xl  font-semibold'>{orderItems.bookId.title}</h2>
                <h3 className='text-xs  '>{orderItems.bookId.category}</h3>
                <div className="flex gap-2">
                   <div className="my-2 gap-6 flex">
                    <span className="text-xl font-bold ">₹: {orderItems.bookId.dprice} </span>
                    <del className= " text-xl font-sm text-gray-500">MRP: {orderItems.bookId.price}</del> 
                     </div>
                </div>
                <div className="flex flex-1 mt-2">
                  <button type='button' onClick={() =>minusQty(orderItems.bookId._id)} className='bg-red-700 text-white px-3 py-2 text-2xl rounded'>-</button>
                   <span className='px-3 py-2 text-2xl'>{orderItems.quantity}</span>
                  <button type='button' onClick={() =>addMoreQty(orderItems.bookId._id)} href="" className='bg-green-700 text-white px-3 py-2 text-2xl rounded'>+</button>
                </div>

              </div>
            </div>
          </div>
            ))
          }
        </div>
       {
        orderItems &&
        <div className="w-2/6">
        <div className="flex border rounded p-4 shadow-md bg-gray-500 flex-col">
         <h2 className='text-3xl  border-b text-white'>Price detail</h2>
         <div className="flex flex-col  gap-2 p-2">
           <div className="flex justify-between ">
              <h3 className='text-lg'>Toatal Amount</h3>
              <h3 className='text-xs'>₹: {totalAmount.toFixed(2)}</h3>
           </div>
           <div className="flex justify-between p-2">
              <h3 className='text-lg'>Tax( GST 18%)</h3>
              <h3 className='text-xs'>₹: {taxAmount.toFixed(2)}</h3>
           </div>
           <div className="flex justify-between p-2 bg-green-600 text-white">
              <h3 className='text-lg'> DiscountPrice</h3>
              <h3 className='text-xs'>₹: {DiscountlAmount.toFixed(2)}</h3>
           </div>
           <div className="flex justify-between  p-2 text-white bg-red-700">
              <h3 className='text-xl font-bold'>Total pay Amount</h3>
              <h3 className='text-xl font-bold'>₹: {totalPayableAmount.toFixed(2)}</h3>
           </div>
         </div>
        </div>
        <div className="flex gap-4 mt-4 ">
         <Link href="/" className='bg-indigo-600 text-white rounded px-3 flex-1 text-center py-2'>More Shopping</Link>
         <Link  href="/checkout" className='bg-green-600 text-white rounded px-3 flex-1 text-center py-2'>check out</Link>
        </div>
        
     </div>
       }
        </div>
    </>
  )
}

export default CartPage