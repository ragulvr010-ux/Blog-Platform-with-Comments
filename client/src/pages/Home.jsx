import React from 'react'
import BlogList from './BlogList'
import Hero from '../components/Hero'
import Trending from '../components/Trending'

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <Trending />
      </section>
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <BlogList />
      </section>
    </div>
  )
}
