import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error){
    return { hasError: true, error }
  }
  componentDidCatch(error, info){
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info)
  }
  render(){
    if (this.state.hasError) return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl p-6 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <pre className="text-sm text-red-600 dark:text-red-400">{String(this.state.error)}</pre>
          <div className="mt-4"><button onClick={()=> location.reload()} className="px-4 py-2 bg-primary text-white rounded">Reload</button></div>
        </div>
      </div>
    )
    return this.props.children
  }
}
