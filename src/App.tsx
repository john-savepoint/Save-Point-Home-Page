import { motion, AnimatePresence } from 'framer-motion'
import { cn } from './lib/utils'
import { useEffect, useState } from 'react'
import GlassHexagon from './components/GlassHexagon'
import ContactForm from './components/ContactForm'

const App = () => {
  console.log('App component code starting')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // Add more detailed logging
  useEffect(() => {
    console.log('Initial mount effect running')
    document.body.style.background = 'black' // Force black background

    const timer = setTimeout(() => {
      console.log('Setting loading to false')
      setIsLoading(true)
      setIsLoaded(true)
    }, 1000)

    return () => {
      console.log('Cleanup running')
      clearTimeout(timer)
    }
  }, [])

  // Simple initial render for debugging
  if (isLoading) {
    console.log('Rendering loading state')
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
      >
        Loading...
      </div>
    )
  }

  console.log('Rendering main content')

  // Simplified initial render
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'black',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          marginBottom: '20px'
        }}
      >
        Save Point
      </h1>
      <p
        style={{
          fontSize: '24px',
          color: '#888'
        }}
      >
        Pioneering the future through innovative technology solutions
      </p>
      <button
        onClick={() => console.log('Button clicked')}
        style={{
          background: 'white',
          color: 'black',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '20px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
      >
        Get Started
      </button>
    </div>
  )
}

export default App
