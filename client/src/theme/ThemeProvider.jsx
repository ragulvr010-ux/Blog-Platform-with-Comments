import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const v = localStorage.getItem('theme')
    return v ? v === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(()=>{
    const root = document.documentElement
    if (dark) root.classList.add('dark'); else root.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },[dark])

  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
