import React from 'react'

export default function Dashboard(){
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">Total Blogs
          <div className="text-3xl font-semibold mt-3">42</div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">Total Views
          <div className="text-3xl font-semibold mt-3">12.4k</div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">Total Comments
          <div className="text-3xl font-semibold mt-3">876</div>
        </div>
      </div>
    </div>
  )
}
