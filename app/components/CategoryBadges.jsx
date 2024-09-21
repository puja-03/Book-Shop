import Link from 'next/link'
import React from 'react'

const CategoryBadges = ({data}) => {
  return (
    <div className="flex flex-1 gap-5">
          {
            data.map((cat,i)=><Link key={i} href={`/category/${cat._id}`} className="bg-white rounded-full border-slate-600 text-md hover:bg-slate-700 px-2 py-1 border">{cat.cat_title}</Link>)
          }
    </div>
  )
}

export default CategoryBadges