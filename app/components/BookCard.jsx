import React from 'react'
import Image from 'next/image'
const BookCard = ({book}) => {
  return (
    <div className="flex-1">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <Image alt="" src={`/book/${book.cover_image}`} width={300} height={300} className=" rounded-t-lg flex w-full h-auto object-cover p-4" />
                </a>
                <div className="p-3">
                  <a href="#">
                    <h2 className="text-xl font-semibold text-white truncate capitalize">Title:{book.title.toLowerCase()}</h2>
                    <h5 className="text-sd font-light mt-2 text-slate-300">Author:{book.author}</h5>
                  </a>
                 <div className="flex gap-3 justify-between flex-col mt-3">
                  <div className="flex flex-col">
                    <span className='dark:text-white text-gray-900 font-bold text-2xl'>Price: ₹{book.dprice} /-</span>
                    <span className='dark:text-white text-gray-900 font-light text-sm'>Discount Price: ₹{book.price}</span>
                  </div>
                  <a href={`/view/${book._id}`} className="  flex w-full text-wrap items-center flex-1   mt-3 px-3 py-2 text-sm font-medium  text-white bg-blue-700 rounded-lg
                   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ringcover_image-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Know More
                  </a>
                 </div>                  
                </div>
              </div>
            </div>
  )
}

export default BookCard