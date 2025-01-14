import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'

console.log('Starting application mount')

const root = document.getElementById('root')
if (!root) {
  console.error('Root element not found')
  throw new Error('Root element not found')
}

try {
  console.log('Creating React root')
  const reactRoot = ReactDOM.createRoot(root)

  console.log('Rendering app')
  reactRoot.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
  console.log('Render complete')
} catch (error) {
  console.error('Error mounting application:', error)
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: black; color: white; padding: 20px; font-family: sans-serif;">
      <h1>Error Starting Application</h1>
      <pre style="color: red; margin-top: 20px;">${error?.toString()}</pre>
    </div>
  `
}

// Remove body[unresolved] styling after hydration
const removeUnresolved = () => {
  document.body.removeAttribute('unresolved')
}

// Add error logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
