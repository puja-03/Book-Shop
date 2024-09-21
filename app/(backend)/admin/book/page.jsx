import Book from "@/app/models/Book";
import DbConnect from "@/app/models/DbConnect";
import Link from "next/link";
import Image from "next/image";
import Category from "@/app/models/Category";
import { handleBookDelete } from "@/app/action";
const page = async () => {
  await DbConnect();
  let callingBook = await Book.find().populate("category");

 
  return (
    <>
      <div className="flex gap-3  flex-col p-3">  
        <div className="flex-1 flex justify-between items-center">
           <h2 className="font-semibild text-2xl ">Manage Book ({callingBook.length})</h2>
           <Link href="/admin/book/insert" className="bg-cyan-600 hover:bg-cyan-800 px-3 py-2 rounded text-white">Add Book</Link>
        </div> 
        <div className="flex">
          <table className="border bg-gray-400 hover:bg-slate-600 rounded  w-full mt-4">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Title </th>
                <th className="border p-2">Author </th>
                <th className="border p-2">Description </th>
                <th className="border p-2">Category </th>
                <th className="border p-2">Price </th>
                <th className="border p-2">CoverImage </th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
           <tbody>
              {callingBook.map((book, index) => {
                let id = book._id;
                let handleDeletewithId = handleBookDelete.bind(null,id)
                return (
                  <tr key={index}>
                    <td className="border p-2">{index+1}</td>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.author}</td>
                    <td className="border p-2">{book.description.substr(0,100)}</td>
                   <td className="border p-2">{book.category.cat_title}</td>
                    <td className="border p-2"><del>{book.price}</del>{book.dprice}</td>
                    <td className="border p-2">
                      <Image alt="" width={100} height={100} className="object.cover p-6" src={`/book/${book.cover_image}`}/>
                    
                    </td>
                    <td className="border p-2 flex gap-3">
                     <form action={handleDeletewithId} method="POST">
                      <button type="submit" className="px-2 py-2 bg-red-700 hover:red-900">Delete</button>
                     </form>
                    </td>
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