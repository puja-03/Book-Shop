
import Image from "next/image";
import DbConnect from "@/app/models/DbConnect";
import Category from "@/app/models/Category";
import Book from "@/app/models/Book";
import CategoryBadges from "@/app/components/CategoryBadges";
import BookCard from "@/app/components/BookCard";


export default async function Home({params}) {
  await DbConnect();
  let {cat_id} = params;
  let callingCategory = await Category.find();
  let getCurrentCategory = await Category.findById(cat_id);
  let callingBook = await Book.find({category:cat_id});
  
  callingBook = JSON.parse(JSON.stringify(callingBook))
  callingCategory = JSON.parse(JSON.stringify(callingCategory))
  return (
    <>
      
      

      <div className="px-[10%] mt-6">
        <CategoryBadges data={callingCategory}/>


        <div className="flex flex-1 mt-4">
          <h1 className="text-slate-900 text-4xl font-semibold capitalize">{getCurrentCategory.cat_title} Book({callingBook.length})</h1>
        </div>

        <div className="grid grid-cols-4 gap-4 justify-center mt-6">
          {callingBook.map((book, index) => <BookCard book={book} key={index}/>
           
          )}
        </div>
      </div>
      
    </>
   
  );
}