import React from "react";
import Order from "../models/Order";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import OrderItem from "../models/OrderItem";

const page = async () => {
  let token = cookies().get("token");
  let user = JWT.verify(token.value, "myproject");
  let orders = await Order.find({ userId: user.id, ordered: true });

  async function getOrderItems(id) {
    let orderItems = await OrderItem.find({ orderId: id }).populate(["bookId"]);
    return orderItems;
  }
  return (
    <div>
      <div className="flex px-[10%] mt-5 flex-col">
        <h1 className="text-2xl font-semibold">My order</h1>
        {orders.length >0 &&
        <div className="flex">
        <div className="flex-1 flex-col">
          {orders.map(async (order, index) => {
            let oi = await getOrderItems(order._id);
            return (
              <div key={index} className="mb-4 border border-slate-900 rounded">
                <div className="bg-slate-400 p-4 rounded">
                  <div className="flex justify-between">
                    <span>OrderId :{order._id}</span>
                    <span>
                      Order Date:{order.dateOfOrder.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex border shadow rounded flex-col bg-white p-4">
                  {oi.map((item, i) => (
                    <>
                      <div key={i} className="w-1/12">
                        <img alt=""
                          className="w-full h-[100px] object-cover"
                          src={`/book/${item.bookId.cover_image}`}
                        />
                      </div>
                      <div className="w-10/12 p-3">
                        <div className="flex flex-col">
                          <h2 className="text-xl  font-semibold">
                            {item.bookId.title}
                          </h2>

                          <div className="my-2 gap-6 flex">
                            <span className="text-xl font-bold ">
                              ₹: {item.bookId.dprice}{" "}
                            </span>
                            <del className=" text-xl font-sm text-gray-500">
                              MRP: {item.bookId.price}
                            </del>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="bg-slate-400 p-4 rounded">
                  <div className="flex justify-between">
                    <span>OrderId :Total Amount</span>
                    <span>Status</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        }
        {orders.length < 1 && <h1 className=" text-slate-400 text-6xl font-black">Not order found</h1>}
      </div>
    </div>
  );
};

export default page;
