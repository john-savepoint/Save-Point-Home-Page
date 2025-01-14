import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

// Remove body[unresolved] styling after hydration
const removeUnresolved = () => {
  document.body.removeAttribute('unresolved')
}

ReactDOM.createRoot(root).render(app)
removeUnresolved()

// Add error logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
