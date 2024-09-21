import Category from '@/app/models/Category'
import Link from 'next/link'
import React from 'react'

import DbConnect from '@/app/models/DbConnect'
import InsertBookForm from '@/app/components/InsertBookForm'
const page =async () => {
 await  DbConnect()
  let callingCat = await Category.find() 
  
  return (
    <div className='p-10'>
      <div className="flex flex-col ">
        <div className="flex flex-1 justify-between items-center">
           <h2 className="font-semibild text-2xl  gap-4">Insert Book</h2>
          <Link href="/admin/book" className="bg-cyan-600 hover:bg-cyan-800 px-3 py-2 rounded text-white">Back</Link>
        </div> 
      </div>
      <div className='flex flex-1 justify-center'>
        <div className=" w-full bg-gray-400 shadow-lg rounded border-slate-900 mt-5 p-2">
         <InsertBookForm callingCat={callingCat}/>
          </div>
      </div>
        
    </div>
  )
}

export default page