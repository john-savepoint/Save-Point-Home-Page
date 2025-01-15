import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RetroTVEffectProps {
  isActive: boolean
  onAnimationComplete?: () => void
}

const RetroTVEffect = ({ isActive, onAnimationComplete }: RetroTVEffectProps) => {
  const [showText, setShowText] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      // Delay showing text until after the screen effects
      setTimeout(() => setShowText(true), 2000)

      // Start fade out after 7 seconds (2s delay + 5s display)
      setTimeout(() => {
        setShowText(false)
        setIsVisible(false)
        onAnimationComplete?.()
      }, 7000)
    } else {
      setShowText(false)
      setIsVisible(false)
    }
  }, [isActive, onAnimationComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Black background layer */}
          <motion.div
            className="fixed inset-0 bg-black z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* White flash layer */}
          <motion.div
            className="fixed inset-0 bg-white z-[999]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              transition: {
                duration: 0.5,
                times: [0, 0.1, 1]
              }
            }}
          />

          {/* Screen collapse effect */}
          <motion.div
            className="fixed inset-0 bg-white z-[999]"
            initial={{
              scaleY: 1,
              scaleX: 1
            }}
            animate={{
              scaleY: [1, 0.005, 0.005, 0],
              scaleX: [1, 1, 0, 0]
            }}
            transition={{
              duration: 1,
              times: [0, 0.5, 0.8, 1],
              ease: 'easeInOut'
            }}
          />

          {/* Thank you message */}
          <AnimatePresence>
            {showText && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-[999] text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
