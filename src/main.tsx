import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'

console.log('=== Application Initialization Start ===')

// Add error logging first
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error)
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: black; color: white; padding: 20px; font-family: sans-serif;">
      <h1>Runtime Error</h1>
      <pre style="color: red; margin-top: 20px;">${event.error?.toString()}</pre>
    </div>
  `
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

const root = document.getElementById('root')
console.log('Root element found:', !!root)

if (!root) {
  const error = new Error('Root element not found')
  console.error(error)
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: black; color: white; padding: 20px; font-family: sans-serif;">
      <h1>Initialization Error</h1>
      <pre style="color: red; margin-top: 20px;">${error.toString()}</pre>
    </div>
  `
  throw error
}

try {
  console.log('Creating React root...')
  const reactRoot = ReactDOM.createRoot(root)

  console.log('Starting render...')
  reactRoot.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
  console.log('=== Initial render complete ===')
} catch (error) {
  console.error('Fatal mounting error:', error)
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: black; color: white; padding: 20px; font-family: sans-serif;">
      <h1>Fatal Error</h1>
      <pre style="color: red; margin-top: 20px;">${error?.toString()}</pre>
    </div>
  `
}
