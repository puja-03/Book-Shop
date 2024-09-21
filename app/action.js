"use server"
import {join} from "path"
import { writeFile } from 'fs/promises'
import Book from '@/app/models/Book'
import { redirect } from "next/navigation";
import Category from "./models/Category";
import User from "./models/User";
import bcrypt from"bcryptjs";
import Address from "./models/Address";


export const handleSubmit = async (formData) => {
    "use server";
    let cat_title = formData.get("cat_title");
    let cat_description = formData.get("cat_description");
    let record = { cat_title, cat_description };
    let data = await Category.create(record);
    redirect("/admin/category");
};

export const handleSubmitToInsertBook = async (formData)=>{
    "use server"
    let title = formData.get("title");
    let author = formData.get("author");
    let price = formData.get( "price");
    let dprice = formData.get("dprice");
    let category = formData.get("category");
    let description = formData.get("description");
    let cover_image = formData.get("cover_image");

    //image upload image
  const bytes = await cover_image.arrayBuffer();
  const buffer = Buffer.from(bytes)
  //creating path we want to create
   const path = join("./public","book",cover_image.name)
   await writeFile(path,buffer);
   
   let data = await Book.create ({title,author,price,dprice,category,cover_image:cover_image.name,description });
   redirect("/admin/book");
 }
export const handleBookDelete = async(id,formData)=>{
    let data= await Book.findByIdAndDelete(id);
    redirect("/admin/book")
}

export const handleCatDelete = async(id,formData)=>{
    let data= await Category.findByIdAndDelete(id);
    redirect("/admin/category")
}

export const HandleCreateAccount = async(formData)=>{
    let name = formData.get("name");
    let contact = formData.get("contact");
    let city = formData.get("city");
    let email = formData.get("email");
    
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(formData.get("password"),salt);
    let record = {name,contact,city,email,password};
    let data= await User.create(record);
     redirect("/")
    
}
export const handleCreateAddress = async(formData)=>{
  let name= formData.get('name');
  let contact= formData.get('contact');
  let city= formData.get('city');
  let state= formData.get('state');
  let landmark= formData.get('landmark');
  let pincode= formData.get('pincode');
  let area = formData.get('area');
  let user = formData.get('user')

  let record = {name,contact,city,state,pincode,area,landmark,user}
  let data = await Address.create(record);
}