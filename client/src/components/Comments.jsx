import React, { useEffect, useState, useContext } from 'react'
import api from '../services/api'
import Comment from './Comment'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Comments({blogId}){
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const { user } = useContext(AuthContext)

  useEffect(()=>{ if (blogId) load() },[blogId])
  const load = async ()=>{
    setLoading(true)
    try{
      const res = await api.get(`/comments?blogId=${blogId}`)
      // assume API returns flat list; build tree
      const map = {}
      (res.data.data||[]).forEach(c=> map[c._id]= {...c, replies:[]})
      const roots = []
      Object.values(map).forEach(c=>{
        if (c.parent){ if (map[c.parent]) map[c.parent].replies.push(c) }
        else roots.push(c)
      })
      setComments(roots)
    }catch(e){ toast.error('Failed to load comments') }
    setLoading(false)
  }

  const post = async ()=>{
    if (!user) return toast.info('Please login to post a comment')
    if (!text || text === '<p><br></p>') return toast.info('Please write a comment')

    // optimistic UI: add temp comment
    const tempId = 'temp-' + Date.now()
    const tempComment = { _id: tempId, author: user, content: text, createdAt: new Date().toISOString(), replies: [] }
    setComments(prev=> [tempComment, ...prev])
    setText('')
    try{
      await api.post('/comments', { blog: blogId, content: text })
      toast.success('Comment posted')
      // refresh to get real IDs
      load()
    }catch(e){
      // rollback optimistic
      setComments(prev => prev.filter(c => c._id !== tempId))
      toast.error('Failed to post comment')
    }
  }

  const handleReply = async ({content, parent})=>{
    if (!content || content === '<p><br></p>') return toast.info('Please write a reply')
    // optimistic reply
    const tempId = 'temp-reply-' + Date.now()
    const tempReply = { _id: tempId, author: user || { name: 'You' }, content, createdAt: new Date().toISOString() }
    // attach optimistically
    setComments(prev => prev.map(c => {
      if (c._id === parent){
        return { ...c, replies: [...(c.replies||[]), tempReply] }
      }
      // also search nested replies
      return c
    }))
    try{
      await api.post('/comments', { blog: blogId, content, parent })
      toast.success('Reply posted')
      load()
    }catch(e){
      // rollback: reload comments
      load()
      toast.error('Failed to post reply')
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <div className="mb-4">
        {!user ? (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded">
            <div className="text-sm">You must <Link to="/login" className="text-primary">login</Link> or <Link to="/register" className="text-primary">register</Link> to post comments.</div>
          </div>
        ) : (
          <>
            <div className="mb-2">
              <ReactQuill value={text} onChange={setText} />
            </div>
            <div className="mt-2"><button onClick={post} className="px-4 py-2 bg-primary text-white rounded">Post Comment</button></div>
          </>
        )}
      </div>

      {loading ? <div className="text-gray-500">Loading comments...</div> : (
        <div className="space-y-3">
          {comments.length===0 ? <div className="text-gray-500">No comments yet.</div> : comments.map(c=> <Comment key={c._id} c={c} onReply={handleReply} />)}
        </div>
      )}
    </div>
  )
}
