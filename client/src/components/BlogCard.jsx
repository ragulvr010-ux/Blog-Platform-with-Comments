import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function BlogCard({ blog }){
  return (
    <motion.article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" whileHover={{ y:-6 }}>
      {blog.featuredImage && <img src={blog.featuredImage} alt="" className="w-full h-44 object-cover" />}
      <div className="p-4">
        <Link to={`/blogs/${blog._id}`} className="text-lg font-semibold line-clamp-2">{blog.title}</Link>
        <p className="text-sm text-gray-500 mt-2">By {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2 text-sm text-gray-500">{(blog.tags||[]).slice(0,3).map(t=> <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{t}</span>)}</div>
          <div className="flex gap-2 text-gray-500">
            <button className="text-sm">Like</button>
            <button className="text-sm">Save</button>
            <button className="text-sm">Share</button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
