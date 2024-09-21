"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PaymentPage = () => {
  let router = useRouter();
  let [orderItems, setOrderItems] = useState([]);
  let [orderData,setOrder] = useState([]);

  useEffect(() => {
    let callinaData = async () => {
      try {
        const orderData = await fetch("http://localhost:3000/api/order", {
         cache: "no-cache",
        });
        const res = await orderData.json();
        setOrderItems(res.orderItems);
        //calling user address
        const addressData = await fetch("http://localhost:3000/api/address",{cache:"no-cache"});
        const addressResponse = await addressData.json();
        setAddress(addressResponse.address)

      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    callinaData();
  }, []);

  /// for total work
    const totalDiscountlAmount = orderItems?.reduce((acc, orderItem) => {
        return acc + orderItem.bookId.dprice * orderItem.quantity;
      }, 0);
    
      const taxAmount = totalDiscountlAmount * 0.18;
      const totalPayableAmount = totalDiscountlAmount + taxAmount;

  const makePayment = async ()=>{
    let order = await fetch("http://localhost:3000/api/order/payment",{method:"PUT"})
    order = await order.json();
    setOrder(order);
  }
  
  return (
    <>
      {
        orderData.length == 0 && 
        <>
        <div className="flex flex-1 my-4">
        <h1 className="text-2xl font-semibold">Make Payment </h1>
      </div>
      <div className="flex flex-1 gap-2 flex-col">
        <div className="w-5/12">
            <h3 className="text-xl font-bold">Total Payable Amount: {totalPayableAmount.toFixed(2)}</h3>
        </div>
        <div className="flex justify-center">
            <div className="w-5/12 flex-col gap-4 flex">
                <h2 className="text-lg my-4">Choose payment Mode</h2>
                <button onClick={makePayment} href="" className="border-2 hover:bg-green-900 rounded shadow-xl hover:text-white px-3 py-2 flex-1 text-left">
                    1. Cash On Delivery(COD)
                </button>
                <Link  href="" className="border-2 hover:bg-green-900 rounded shadow-xl hover:text-white px-3 py-2 flex-1 text-left">
                    2.  pay Online
                </Link>
            </div>
        </div>
      </div>
        </>
      }
      {
        orderData.length != 0 &&
        <>
        <div className="flex flex-1 flex-col  gap-4 justify-center border rounded-lg border-slate-950 bg-white p-6 my-3">
            <h1 className="text-6xl text-center font-semibold text-green-600">Wow ! </h1>
            <h1 className="text-2xl text-center font-semibold">Oreder placed Successfully</h1>
            <Link href="/myorder" className="bg-red-800 self-center text-white px-3 py-2">My Order</Link>
        </div>
        </>
      }
    </>
  );
};

export default PaymentPage;