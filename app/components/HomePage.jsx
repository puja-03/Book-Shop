"use client"
import React, { useState } from 'react'
import CategoryBadges from './CategoryBadges'
import BookCard from './BookCard'

const HomePage = ({callingBook,callingCategory}) => {
    let [searchQuery ,setSearchQuery] = useState("");
    const filterBook = callingBook.filter((book)=>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  return (
    <>
     <div className="justify-center items-center bg-teal-900  flex flex-1  h-[300px] ">
        <div className="w-1/2 flex flex-col gap-5 justify-center items-center ">

          <h1 className=" text-2xl font-semibold text-white mt-10">You can search Any Type of Book Here </h1>
          <input type="search" onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search Your Book here... " className="border text-black rounded px-3 py-3 w-full" />
        </div>
      </div>

      <div className="px-[10%] mt-6">
        <CategoryBadges data={callingCategory}/>


        <div className="flex flex-1 mt-4">
          <h1 className="text-slate-900 text-4xl font-semibold">Latest Book({filterBook.length})</h1>
        </div>

        <div className="grid grid-cols-4 gap-4 justify-center mt-6">
          {filterBook.map((book, index) => <BookCard key={index} book={book}/>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage