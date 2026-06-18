import React from 'react'

export default function Skeleton({count=6}){
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Array.from({length: count}).map((_,i)=> (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-4 h-56" />
      ))}
    </div>
  )
}
