import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Editor(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const publish = async ()=>{
    // integrate with API to publish
    alert('Publish stub')
  }

  return (
    <div className="container py-8">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 rounded-md mb-4 border" />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div className="mt-4"><button onClick={publish} className="px-4 py-2 bg-primary text-white rounded">Publish</button></div>
    </div>
  )
}
