import { motion, AnimatePresence } from 'framer-motion'
import { cn } from './lib/utils'
import { useEffect, useState } from 'react'
import GlassHexagon from './components/GlassHexagon'
import spHomeLogo from '../static/spHome_logo.svg'

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-x-hidden">
      {/* Glass Hexagon Overlay */}
      <GlassHexagon />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse delay-1000"
        />

        {/* Enhanced Particle Effect */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-4">
              <motion.div
                className="text-center"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold mb-6"
                    animate={{
                      backgroundPosition: ['0%', '100%'],
                      transition: {
                        duration: 8,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }
                    }}
                  >
                    <img
                      src={spHomeLogo}
                      alt="SP Home Logo"
                      className="h-24 md:h-96 mx-auto"
                    />
                  </motion.h1>
                </motion.div>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                  Pioneering the future through innovative technology solutions
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="space-x-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'px-8 py-3 rounded-full text-lg font-semibold',
                      'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                      'hover:opacity-90 transition-opacity'
                    )}
                  >
                    Explore Our Solutions
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'px-8 py-3 rounded-full text-lg font-semibold',
                      'bg-white/10 backdrop-blur-sm',
                      'hover:bg-white/20 transition-colors',
                      'border border-white/20'
                    )}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <motion.h2
                    variants={floatingAnimation}
                    animate="animate"
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    Our Expertise
                  </motion.h2>
                  <p className="text-xl text-gray-400">Transforming ideas into cutting-edge solutions</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'AI Innovation',
                      description: 'Leveraging cutting-edge artificial intelligence to transform businesses',
                      icon: '🤖'
                    },
                    {
                      title: 'Tech Solutions',
                      description: 'Custom software development tailored to your unique challenges',
                      icon: '💻'
                    },
                    {
                      title: 'Future Ready',
                      description: "Preparing your business for tomorrow's technological landscape",
                      icon: '🚀'
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        ease: 'easeOut'
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transition: { duration: 0.2 }
                      }}
                      className={cn(
                        'p-8 rounded-2xl',
                        'bg-white/5 backdrop-blur-lg',
                        'border border-white/10',
                        'hover:bg-white/10 transition-all',
                        'group cursor-pointer'
                      )}
                    >
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 relative">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={cn(
                    'grid grid-cols-1 md:grid-cols-4 gap-8',
                    'p-8 rounded-2xl',
                    'bg-white/5 backdrop-blur-lg',
                    'border border-white/10'
                  )}
                >
                  {[
                    { number: '21+', label: 'Years Experience' },
                    { number: '50+', label: 'Projects Delivered' },
                    { number: '100%', label: 'Client Satisfaction' },
                    { number: '24/7', label: 'Support' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <motion.div
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 100
                        }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-gray-400 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    'p-8 rounded-2xl text-center',
                    'bg-white/5 backdrop-blur-lg',
                    'border border-white/10',
                    'transition-all duration-300'
                  )}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                  >
                    Ready to Transform Your Business?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-gray-400 mb-8"
                  >
                    Let's build something amazing together
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'px-8 py-3 rounded-full text-lg font-semibold',
                      'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                      'hover:opacity-90 transition-opacity'
                    )}
                  >
                    Get in Touch
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8 px-4 border-t border-white/10"
            >
              <div className="max-w-6xl mx-auto text-center text-gray-400">
                <p>© 2024 Save Point Proprietary Limited. All rights reserved.</p>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
