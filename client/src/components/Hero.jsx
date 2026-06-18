import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ x:-40, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.5 }}>
          <h1 className="text-4xl font-extrabold mb-4">Write better. Read better.</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">A modern blogging platform to create, share and grow your ideas — beautiful, fast and simple.</p>
          <div className="flex gap-3">
            <Link to='/create' className="px-5 py-3 bg-primary text-white rounded-md">Write a story</Link>
            <Link to='/blogs' className="px-5 py-3 border rounded-md">Explore</Link>
          </div>
        </motion.div>
        <motion.div initial={{ x:40, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.5 }}>
          <div className="w-full h-64 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white text-xl">Trending topics & editor picks</div>
        </motion.div>
      </div>
    </section>
  )
}
