import React, { useState, useContext } from 'react'
import api from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CreateBlog(){
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submit = async e =>{
    e.preventDefault()
    const form = new FormData()
    form.append('title', title)
    form.append('content', content)
    const res = await api.post('/blogs', form)
    navigate(`/blogs/${res.data._id}`)
  }

  if (!user) return <div>Please login to create posts</div>
  return (
    <form onSubmit={submit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Title' />
      <ReactQuill value={content} onChange={setContent} />
      <button type='submit'>Publish</button>
    </form>
  )
}
