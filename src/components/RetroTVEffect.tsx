import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RetroTVEffectProps {
  isActive: boolean
  onAnimationComplete?: () => void
}

const RetroTVEffect = ({ isActive, onAnimationComplete }: RetroTVEffectProps) => {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden'
      // Show text after the screen effect
      const timer = setTimeout(() => {
        setShowText(true)
      }, 1000) // 1 second after effect starts

      // Hide text and complete after 6 seconds total (1s effect + 5s display)
      const completeTimer = setTimeout(() => {
        setShowText(false)
        onAnimationComplete?.()
      }, 6000)

      return () => {
        document.body.style.overflow = ''
        clearTimeout(timer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, onAnimationComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* White flash and vertical collapse */}
          <motion.div
            className="fixed inset-0 bg-white z-[999] origin-[center_center]"
            initial={{ scaleY: 1 }}
            animate={{
              scaleY: 0.01,
              backgroundColor: ['#fff', '#fff', '#000'],
              transition: {
                duration: 0.5,
                times: [0, 0.1, 1],
                ease: [0.4, 0, 0.2, 1]
              }
            }}
          >
            {/* Horizontal collapse */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scaleX: 1 }}
              animate={{
                scaleX: 0,
                transition: {
                  duration: 0.3,
                  delay: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            />
          </motion.div>

          {/* Black background */}
          <motion.div
            className="fixed inset-0 bg-black z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.8 }}
          />

          {/* Message */}
          <AnimatePresence>
            {showText && (
              <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#fff',
                      textShadow: '0 0 10px rgba(255,255,255,0.8)',
                      letterSpacing: '4px'
                    }}
                  >
                    THANK YOU
                  </motion.h2>
                  <motion.p
                    className="text-xl md:text-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      fontFamily: '"Press Start 2P", monospace',
                      color: '#fff',
                      textShadow: '0 0 5px rgba(255,255,255,0.6)',
                      letterSpacing: '2px'
                    }}
                  >
                    We'll be in touch soon...
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default RetroTVEffect
