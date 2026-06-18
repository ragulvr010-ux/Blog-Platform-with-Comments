import React from 'react'
import { motion } from 'framer-motion'

const dummy = new Array(4).fill(0).map((_,i)=> ({ id:i, title:`Trending Article ${i+1}`, author:'Editor' }))

export default function Trending(){
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {dummy.map(item => (
        <motion.div key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm" whileHover={{ scale:1.02 }}>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">By {item.author}</p>
        </motion.div>
      ))}
    </div>
  )
}
