import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogList from './pages/BlogList'
import BlogDetails from './pages/BlogDetails'
import CreateBlog from './pages/CreateBlog'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
