import React, { useEffect, useState } from 'react'
import api from '../services/api'
import BlogCard from '../components/BlogCard'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'

export default function BlogList(){
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const perPage = 9

  useEffect(()=>{ fetchBlogs() },[])
  const fetchBlogs = async ()=>{
    setLoading(true)
    try{
      const res = await api.get('/blogs')
      setBlogs(res.data.data || [])
    }catch(e){
      setBlogs([])
    }finally{
      setLoading(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(blogs.length / perPage))
  const visible = blogs.slice((page-1)*perPage, page*perPage)

  if (loading) return <Skeleton count={perPage} />
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6">
        {visible.map(b => (
          <BlogCard key={b._id} blog={b} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={p=>setPage(p)} />
    </div>
  )
}
