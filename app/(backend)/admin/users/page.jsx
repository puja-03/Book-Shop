import DbConnect from "@/app/models/DbConnect";
import User from "@/app/models/User";
const page = async () => {
  await DbConnect();
  let callingUsers = await User.find()

 
  return (
    <>
      <div className="flex gap-3  flex-col p-3">  
        <div className="flex-1 flex justify-between items-center">
           <h2 className="font-semibild text-2xl ">Manage Users ({callingUsers.length})</h2>
        </div> 
        <div className="flex">
          <table className="border bg-gray-400 hover:bg-slate-600 rounded  w-full mt-4">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Contact </th>
                <th className="border p-2">Email</th>
                <th className="border p-2">City </th>
              </tr>
            </thead>
           <tbody>
              {callingUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="border p-2">{index+1}</td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.contact}</td>
                    <td className="border p-2">{user.email}</td>
                   <td className="border p-2">{user.city}</td>
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