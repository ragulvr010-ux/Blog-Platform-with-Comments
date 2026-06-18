import React, { useState, useContext } from 'react'
import api from '../services/api'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register(){
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e =>{
    e.preventDefault();
    if (!name || !email || !password) return toast.info('Please fill all fields')
    setLoading(true)
    try{
      const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      toast.success('Registered and logged in')
      navigate('/')
    }catch(err){
      const msg = err?.response?.data?.message || err.message || 'Registration failed'
      toast.error(msg)
    }finally{ setLoading(false) }
  }

  return (
    <div className="container py-8">
      <form onSubmit={submit} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        <label className="block mb-2 text-sm">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' className="w-full p-2 mb-3 border rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className="w-full p-2 mb-3 border rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
        <label className="block mb-2 text-sm">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='Password' className="w-full p-2 mb-4 border rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
        <button type='submit' disabled={loading} className="w-full px-4 py-2 bg-primary text-white rounded">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
    </div>
  )
}
