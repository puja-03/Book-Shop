import DbConnect from "@/app/models/DbConnect";
import Order from "@/app/models/Order";
const page = async () => {
  await DbConnect();
  let callingOrders = await Order.find({"ordered":true}).populate(["userId"])

 
  return (
    <>
      <div className="flex gap-3  flex-col p-3">  
        <div className="flex-1 flex justify-between items-center">
           <h2 className="font-semibild text-2xl ">Manage Orders ({callingOrders.length})</h2>
        </div> 
        <div className="flex">
          <table className="border bg-gray-400 hover:bg-slate-600 rounded  w-full mt-4">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Date </th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Action </th>
              </tr>
            </thead>
           <tbody>
              {callingOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td className="border p-2">{index+1}</td>
                    <td className="border p-2">{order.userId.name}</td>
                    <td className="border p-2">{order.dateOfOrder.toLocaleString()}</td>
                   {/*<td className="border p-2">{order.address.area}({order.address.city})</td>*/}

                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;