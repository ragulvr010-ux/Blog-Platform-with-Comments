import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import Comments from '../components/Comments'

const MOCK = {
  _id: 'mock-1',
  title: 'Sample Post (offline)',
  author: { name: 'System' },
  createdAt: Date.now(),
  content: '<p>This is sample content shown because the API is unavailable.</p>'
}

export default function BlogDetails(){
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{ if (id) load() },[id])
  const load = async ()=>{
    try{
      const res = await api.get(`/blogs/${id}`)
      const data = res.data?.data || res.data
      setBlog(data)
    }catch(e){
      setError(e)
      setBlog(MOCK)
    }
  }

  if (!blog) return <div className="container py-8">Loading...</div>
  return (
    <article className="container py-8">
      {error && <div className="mb-4 text-sm text-red-600">Failed to load from API, showing fallback content.</div>}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <Comments blogId={blog._id} />
    </article>
  )
}
