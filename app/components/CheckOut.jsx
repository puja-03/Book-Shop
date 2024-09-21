"use client";
import Toast from "react-hot-toast";
import {z} from "zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateAddress } from "../action";

const CheckOutPage = () => {
  let router = useRouter();
  let [orderItems, setOrderItems] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [address ,setAddress] = useState([])


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
  }, [refresh]);

  /// for total work
 const totalDiscountlAmount = orderItems.reduce((acc, orderItem) => {
    return acc + orderItem.bookId.dprice * orderItem.quantity;
  }, 0);

  const taxAmount = totalDiscountlAmount * 0.18;
  const totalPayableAmount = totalDiscountlAmount + taxAmount;
 
  const AddressValidationSchema = z.object({
    name: z.string(),
    contact: z.number().gte(10,{message:"contact no must be in 10 digit"}),
    area: z.string().min(3).max(50),
    city:z.string().min(3).max(50),
    pincode:z.number().gte(6,{message:"pincode must be in 6 digit"}),
    landmark:z.string().min(3).max(50),
    state:z.string().min(3).max(50),

  })
  const handleToCreateAddressClient = async(formData) =>{
    formData.set("user",orderItems[0].userId._id)
    let records = {
      name:formData.get("name"),
      contact:+formData.get('contact'),
      city: formData.get('city'),
      state: formData.get('state'),
      landmark:formData.get('landmark'),
      pincode:+formData.get('pincode'),
      area : formData.get('area'),
    };
    let data = AddressValidationSchema.safeParse(records);
    if(!data.success){
      data.error.issues.forEach((issue)=>{
        Toast.error(issue.path[0] + ":" +issue.message)
      });
      return;
    }
    await handleCreateAddress(formData);
  }
  const handleUpdateAddress = async (address)=>{
   let updateAddress = await fetch("http://localhost:3000/api/order",{method:"PUT" ,
  body:JSON.stringify({address}),cache:"no-cache"})
  let respAddress = await updateAddress.json();
  if (respAddress.order.address){
    alert("updated successfully")
  }
  }
  return (
    <>
      <div className="flex flex-1 my-4">
        <h1 className="text-2xl font-semibold">CheckOut</h1>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="w-4/6 gap-3">
             <div className="flex flex-col gap-1 shadow rounded border-lg p-3 bg-pink-600 mb-4">
             <h2 className="font-bold text-2xl ">Save Address</h2>
                 {
                  (address.length > 0) &&  <div className="grid roundedm  grid-cols-3 gap-3">
                  {
                    address.map((add,i)=>(
                      <div className="border flex-1 h-auto" key={i}>
                  <div className="px-2 py-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{add.name}</h3>
                      <input onClick={()=>handleUpdateAddress(add._id)} type="radio" className="form-radio h-5 w-5 text-blue-500" name="address" id="address"/>
                    </div>
                    <p className="mt-1 text-sm text-slate-300">{`(+91)${add.contact},
                    ${add.area},${add.city}
                    (${add.state}) - ${add.pincode}
                    landmark:${add.landmark} `}</p>
                  </div>
                </div>
                    ))
                  }
               </div>
                 }
                 {address.length == 0 && <h1 className="text-slate-800 text-2xl ">empty address</h1>}
             </div>
            <div className="flex flex-col">
                <div className="flex flex-col rounded bg-gray-700 gap-1 shadow border p-3">
                    <form action={handleToCreateAddressClient} method="Post" className="flex flex-col gap-3 rounded">
                    <h2 className="font-bold text-2xl ">Enter Delivery address detail</h2>
                          <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-white" htmlFor="name">Full Name</label>
                                <input type="text" name="name" id="name" className="border text-black rounded w-full px-3 py-2" />
                            </div>
                            <div className="flex-1">
                                <label className="text-white" htmlFor="contact">contact</label>
                                <input type="text" name="contact" id="contact" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-white" htmlFor="area">Street/Village/Area</label>
                                <input type="text" name="area" id="area" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                            <div className="flex-1">
                                <label className="text-white" htmlFor="landmark">landmark</label>
                                <input type="text" name="landmark" id="landmark" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1">
                                <label  className="text-white" htmlFor="city">City</label>
                                <input type="text" name="city" id="city" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                            <div className="flex-1">
                                <label  className="text-white" htmlFor="state">state</label>
                                <input type="text" name="state" id="state" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                            <div className="flex-1">
                                <label  className="text-white" htmlFor="pincode">pincode</label>
                                <input type="text" name="pincode" id="pincode" className=" text-black rounded border w-full px-3 py-2" />
                            </div>
                          </div>
                          <div className="flex flex-1 gap-3">
                            <button type="reset" className="bg-teal-700 text-white px-3 py-2 flex-1 rounded">Submit Form</button>
                            <button type="submit" className="bg-cyan-700 text-white px-3 py-2 flex-1 rounded">Save Address</button>
                          </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="w-2/6">
          <div className="flex flex-col border shadow rounded p-4 mb-3  bg-gray-400">
            <h2 className="font-semibold border-b mt-2 pb-3 ">
              Order Information{" "}
            </h2>
            {orderItems.map((orderItems, i) => (
              <div className="w-full p-2" key={i}>
                <div className="flex flex-col">
                  <h2 className="text-sm  font-semibold">
                    {i + 1}.{orderItems.bookId.title}
                  </h2>
                  <div className="flex gap-2">
                    <div className="">
                      <span className="text-xl font-bold">
                        {orderItems.quantity}X
                      </span>
                      <span className="text-xl  font-bold">
                        {orderItems.bookId.dprice}=
                      </span>
                      <span className="text-xl font-bold ">
                        {orderItems.bookId.dprice * orderItems.quantity}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex  rounded p-1  flex-col">
              <h2 className="text-3xl  border-b">Price detail</h2>
              <div className="flex flex-col  gap-1">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">Total PayAmount</h3>
                  <h3 className="text-xl font-bold">
                    ₹: {totalPayableAmount.toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4 ">
            <Link
              href="/payment"
              className="bg-indigo-600 text-white rounded px-3 flex-1 text-center py-2"
            >
              Make Payment
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
