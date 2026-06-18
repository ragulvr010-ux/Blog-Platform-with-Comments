import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Comment({c, onReply}){
  const [open, setOpen] = useState(false)
  const { user } = useContext(AuthContext)

  return (
    <div className="border-b border-gray-100 dark:border-gray-700 py-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.author?.name || 'Anonymous'}</div>
              <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
            {user ? (
              <button onClick={()=>setOpen(!open)} className="text-sm">Reply</button>
            ) : (
              <Link to="/login" className="text-sm">Login to reply</Link>
            )}
          </div>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: c.content }} />
          {open && (
            <div className="mt-2">
              <ReplyForm parentId={c._id} onReply={onReply} onClose={()=>setOpen(false)} />
            </div>
          )}

          {c.replies && c.replies.length>0 && (
            <div className="mt-3 ml-12">
              {c.replies.map(r=> <Comment key={r._id} c={r} onReply={onReply} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReplyForm({parentId, onReply, onClose}){
  const [text, setText] = useState('')
  const submit = async ()=>{
    if (!text || text === '<p><br></p>') return
    await onReply({ content:text, parent: parentId })
    setText('')
    onClose()
  }
  return (
    <div>
      <div className="mb-2">
        <ReactQuill value={text} onChange={setText} />
      </div>
      <div className="flex gap-2">
        <button onClick={submit} className="px-3 py-1 bg-primary text-white rounded">Reply</button>
        <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </div>
  )
}
