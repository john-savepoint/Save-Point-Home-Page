import { motion } from 'framer-motion'
import { cn } from './lib/utils'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-pulse delay-1000" />

        {/* Particle Effect */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              Save Point
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Pioneering the future through innovative technology solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-x-4"
            >
              <button
                className={cn(
                  'px-8 py-3 rounded-full text-lg font-semibold',
                  'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                  'hover:opacity-90 transition-opacity'
                )}
              >
                Explore Our Solutions
              </button>
              <button
                className={cn(
                  'px-8 py-3 rounded-full text-lg font-semibold',
                  'bg-white/10 backdrop-blur-sm',
                  'hover:bg-white/20 transition-colors',
                  'border border-white/20'
                )}
              >
                Learn More
              </button>
            </motion.div>
          </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={cn(
                    'p-8 rounded-2xl',
                    'bg-white/5 backdrop-blur-lg',
                    'border border-white/10',
                    'hover:bg-white/10 transition-colors',
                    'group'
                  )}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
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
            <div
              className={cn(
                'grid grid-cols-1 md:grid-cols-4 gap-8',
                'p-8 rounded-2xl',
                'bg-white/5 backdrop-blur-lg',
                'border border-white/10'
              )}
            >
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '50+', label: 'Projects Delivered' },
                { number: '99%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
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
              className={cn('p-8 rounded-2xl text-center', 'bg-white/5 backdrop-blur-lg', 'border border-white/10')}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-400 mb-8">Let's build something amazing together</p>
              <button
                className={cn(
                  'px-8 py-3 rounded-full text-lg font-semibold',
                  'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                  'hover:opacity-90 transition-opacity'
                )}
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>© 2024 Save Point Proprietary Limited. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
