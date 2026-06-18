import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async e =>{
    e.preventDefault()
    setLoading(true)
    try{
      await login(email,password)
      navigate('/')
    }catch(err){
      // silent - AuthContext.login may throw; you can add toasts if desired
    }finally{ setLoading(false) }
  }

  return (
    <div className="container py-8">
      <form onSubmit={submit} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className="w-full p-2 mb-3 border rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
        <label className="block mb-2 text-sm">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='Password' className="w-full p-2 mb-4 border rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
        <button type='submit' disabled={loading} className="w-full px-4 py-2 bg-primary text-white rounded">{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </div>
  )
}
