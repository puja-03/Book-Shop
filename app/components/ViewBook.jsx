"use client"
import { useRouter } from "next/navigation"
import  Toast  from "react-hot-toast"
const ViewBook = ({book}) => {
    let router = useRouter()
    const handleAddToCart = async ()=>{
        
        let data= await fetch(`http://localhost:3000/api/cart/add/${book._id}`)
        let res = await data.json();
        if(!res.success){
            Toast.success(res.message)
            router.push("/cart")
        }
    }
  return (
    <div className=" flex w-full bg-white border border-gray-200 rounded-lg shadow
    dark:bg-gray-600 dark:border-gray-600">
       <div className="w-1/3 p-5">
          <div className='flex-1 flex'>
              <img  className="rounded-t-lg flex-1 w-full h-[400px] object-cover"  src={`/book/${book.cover_image}`}
               alt="product image" />
           </div>
       </div>
       
       <div className="w-2/3">
           <div className="p-5 flex-[1.5]">
               <a href="#">
                   <h5 className="text-xl font-semibold tracking-tight text-white truncate capitalize">
                       {book.title.toLowerCase()}</h5>
                   <h6 className="text-sm font-light mt-2 tracking-tight text-gray-900 dark:text-white">
                       {book.author}</h6>
               </a>
               <div className="flex flex-col">
                   <div className='flex flex-1 flex-col my-5'>
                       <h4 className='text-lg p-2 font-semibold '>Description</h4>
                       <p className='text-white text-justify'>{book.description}</p>
                   </div>

                   <span className="dark:text-white text-gray-900 font-bold text-2xl ">₹{book.dprice}</span>
                   <span className=" text-black font-light text-sm ">MRP:<del>₹{book.price}</del></span>
               </div>

               <div className='flex gap-5 mt-3'>
                   <button type='button' onClick={handleAddToCart}  className=" text-white
                    bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-
                     dark:bg-red-600 dark:hover:bg-red-700 p-3 dark:focus:ring-red-800 flex gap-2 items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                           <path strokelinecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                       </svg>
                       <span>Add To Card</span>
                       </button>

                   <a href="#" className=" text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-pink-700 p-3 dark:focus:ring-green-800 flex gap-2 items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                           <path strokelinecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                       </svg>
                       <span>Buy Now</span>
                   </a>
               </div>
           </div>
       </div>
   </div>  )
}

export default ViewBook