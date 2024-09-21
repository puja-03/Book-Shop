import React from 'react'

const page =async () => {
    let countData = await fetch("http://localhost:3000/api/count");
    countData = await countData.json();

  return (

    <div className='flex gap-5 p-5'>
        <div className='flex-1 bg-yellow-500 text-white p-5 rounded-lg'>
        <h1>Total Books</h1>
            <h2>{countData.bookCount}</h2>
        </div>
        <div className='flex-1 bg-purple-800 text-white p-5 rounded-lg'>
        <h1>Total User</h1>
            <h2>{countData.userCount}</h2>
        </div>
        <div className='flex-1 bg-cyan-800 text-white p-5 rounded-lg'>
        <h1>Total Category</h1>
            <h2>{countData.categoryCount}</h2>  
        </div>
        <div className='flex-1 bg-pink-800 text-white p-5 rounded-lg'>
        <h1>Total Orders</h1>
            <h2>{countData.orderCount}</h2>
        </div>
    </div>
  )
}

export default page