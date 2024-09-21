import BookCard from '@/app/components/BookCard'
import ViewBook from '@/app/components/ViewBook'
import Book from '@/app/models/Book'
import DbConnect from '@/app/models/DbConnect'
import Image from 'next/image'


const page = async ({ params }) => {
    await DbConnect();
    let { bookid } = params
    const book = await Book.findById(bookid)
    const relatedBook = await Book.find({"_id":{$ne :bookid}});
    return (
        <div className='px-[15%] flex flex-1 pt-16 flex-col'>
           <ViewBook book={book}/>
               <div className="flex flex-col flex-1 gap-4 mt-8">
                <h1 className='text-2xl font-semibold text-slate-600'>You make also Like</h1>
                <div className='grid grid-cols-4 gap-3 mt-6'>

                {relatedBook.map((book,i)=><BookCard book={book} key={i}/>)}
            </div>
               </div>
            
        </div>
    )
}

export default page