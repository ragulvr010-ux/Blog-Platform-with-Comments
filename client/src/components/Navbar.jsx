import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ThemeContext } from '../theme/ThemeProvider'
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const { dark, setDark } = useContext(ThemeContext)
  const [q, setQ] = useState('')

  return (
    <motion.nav className="bg-white dark:bg-gray-800 shadow-sm" initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.4 }}>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link to='/' className="text-xl font-bold text-gray-900 dark:text-white">Mediumish</Link>
          <div className="relative hidden md:flex items-center">
            <FiSearch className="absolute left-3 text-gray-400" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles, authors, tags" className="pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm w-80" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={()=>setDark(!dark)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">{dark ? <FiSun/> : <FiMoon/>}</button>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm">Hi, {user.name}</span>
              <Link to='/create' className="px-3 py-2 bg-primary text-white rounded-md text-sm">Write</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to='/login' className="text-sm">Login</Link>
              <Link to='/register' className="px-3 py-2 bg-accent text-white rounded-md text-sm">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
