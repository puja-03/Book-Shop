import { handleCatDelete } from "@/app/action";
import InsertCategory from "@/app/components/InsertCategory";
import Category from "@/app/models/Category";
import DbConnect from "@/app/models/DbConnect";
import React from "react";

const page = async () => {
  await DbConnect();
  let callingCat = await Category.find();
   
  return (
    <>
      <div className="flex gap-3 p-3 flex-col"> 
        <div className="flex-1">
           <h2 className="font-semibild text-2xl ">Manage category({callingCat.length})</h2>
        </div> 
      <div className="flex">
      <div className="w-2/3">
          
          <table className="bordxer bg-gray-400 hover:bg-slate-600 rounded  w-full mt-4">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2"> Title </th>
                <th className="border p-2"> Description </th>
                <th className="border p-2"> Action</th>
              </tr>
            </thead>
            <tbody>
              {callingCat.map((cat, index) => {
                let id = cat._id;
                let handleCatDeletwithId = handleCatDelete.bind(null,id);
                return (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cat.cat_title}</td>
                    <td className="border p-2">{cat.cat_description}</td>
                    <td className="border p-2">
                    <form action={handleCatDeletwithId} method="POST">
                      <button type="submit" className="px-2 py-2 bg-red-800 hover:bg-red-900">x</button>
                     </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-1/3 p-3">
          <InsertCategory/>
        </div>
      </div>
      </div>
    </>
  );
};

export default page;
