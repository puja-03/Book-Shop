"use client"
import React from 'react'
import { handleSubmitToInsertBook } from '../action'
import{z} from "zod";
import toast from 'react-hot-toast';


const InsertBookForm =({callingCat}) => {

  let bookValidationSchema = z.object({
    title:z.string({
      required_error:"title is required",
      invalid_type_error:"title must be string"
    }),
    author:z.string({
      required_error:"auther is required",
      invalid_type_error:"auther must be string"
    }),
    description:z.string({
      required_error:"description is required",
      invalid_type_error:"description must be string"
    }),
    category:z.string({
      required_error:"category is required",
      invalid_type_error:"category must be string"
    }),
    price:z.number({
      required_error:"price is required",
      invalid_type_error:"price must be string"
    }),
    dprice:z.number(),
    cover_image:z.string({
      required_error:"coverImage is required",
      invalid_type_error:"coverImage must be string"
    }),
  
  })
 const InsertBookClientAction = async(formData)=>{
  let records = {
    "title": formData.get("title"),
    "author":formData.get("author"),

    "description":formData.get("description"),
    "category":formData.get("category"),
    "price":+formData.get("price"),
    "dprice":+formData.get("dprice"),
    "cover_image":formData.get("cover_image").name,
  }
   let data = bookValidationSchema.safeParse(records)

   if(!data.success){
    data.error.issues.forEach(err=>{
      toast.error(err.path[0]+":"+err.message)
    })
    return;
   }
    await handleSubmitToInsertBook(formData);
   
 }

  return (
    <form action={InsertBookClientAction} method="POST" >
    <div className='flex gap-3'>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="title"> title</label>
      <input
        type="text"
        placeholder="Enter your title"
        className="border text-black rounded px-2 py-2"
        id="title"
        name="title"
      />
    </div>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="author"> author</label>
      <input
        type="text"
        placeholder="Enter your author"
        className="border text-black rounded px-2 py-2"
        id="author"
        name="author"
      />
    </div>
    </div>
    <div className='flex gap-3'>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="price">price </label>
      <input
        type="text"
        placeholder="Enter your price"
        className="border text-black rounded px-2 py-2"
        id="price"
        name="price"
      />
    </div>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="dprice">dprice </label>
      <input
        type="text"
        placeholder="Enter your dprice"
        className="border text-black rounded px-2 py-2"
        id="dprice"
        name="dprice"
      />
    </div>
    </div>
    <div className='flex gap-3'>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="category">category </label>
      <select
        type="text"
        placeholder="Enter yourcategory"
        className="border text-black rounded px-2 py-2"
        id="category"
        name="category"
      >
        <option value="" selected disabled>Select category</option>
        {
          callingCat.map((cat,i)=>(<option value={cat._id}>{cat.cat_title}</option>))
        }
      </select>
    </div>
   
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="cover_image">file </label>
      <input
        type="file"
        className="border text-black rounded px-2 py-2"
        id="cover_image"
        name="cover_image"
      />
    </div>
    </div>
    <div className="mb-3 flex flex-1 gap-2 flex-col">
      <label htmlFor="description">Description</label>
      <textarea
        rows={10}
        placeholder="Enter your Description"
        className="border text-black rounded px-2 py-2"
        id="description"
        name="description"
      ></textarea>
    </div>
   

    <div className="mb-3 flex-1 gap-2 flex flex-col w-full">
      <button
        type="submit"
        className="bg-red-400 text-white px-3 py-2 rounded w-full hover:bg-red-900"
      >
        create book
      </button>
    </div>
  </form>
  )
}

export default InsertBookForm
