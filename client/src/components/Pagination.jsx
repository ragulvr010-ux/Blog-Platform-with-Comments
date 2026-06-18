import React from 'react'

export default function Pagination({currentPage, totalPages, onPageChange}){
  if (totalPages <= 1) return null
  const pages = Array.from({length: totalPages}, (_,i)=>i+1)
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      {pages.map(p=> (
        <button key={p} onClick={()=>onPageChange(p)} className={`px-3 py-1 rounded ${p===currentPage ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{p}</button>
      ))}
    </div>
  )
}
