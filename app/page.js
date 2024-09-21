
import Link from "next/link";
import Category from "./models/Category";
import DbConnect from "./models/DbConnect";
import Book from "./models/Book";
import CategoryBadges from "./components/CategoryBadges";
import BookCard from "./components/BookCard";
import HomePage from "./components/HomePage";

export default async function Home() {
  await DbConnect()
  let callingCategory = await Category.find();
  let callingBook = await Book.find()


  return (
   <HomePage callingBook={callingBook} callingCategory={callingCategory}/>
   
  );
}
