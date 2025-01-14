import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../lib/utils'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '8fa24e44-9f85-4831-9082-b8772627e673', // You'll need to sign up at Web3Forms
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          to: 'john@savepoint.com.au'
        })
      })

      if (response.ok) {
        setFormData({ name: '', email: '', company: '', message: '' })
        onClose()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'w-full max-w-lg relative',
                'bg-gradient-to-br from-white/10 to-white/5',
                'rounded-2xl backdrop-blur-xl',
                'border border-white/10',
                'shadow-2xl'
              )}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Form content */}
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-2">
                    Let's Connect
                  </h2>
                  <p className="text-gray-400 mb-6">Transform your ideas into reality with Save Point</p>
                </motion.div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-white/80 text-sm font-medium">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg',
                        'bg-white/5 border border-white/10',
                        'text-white placeholder-white/30',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                        'transition-all duration-300'
                      )}
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="block text-white/80 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg',
                        'bg-white/5 border border-white/10',
                        'text-white placeholder-white/30',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                        'transition-all duration-300'
                      )}
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label className="block text-white/80 text-sm font-medium">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg',
                        'bg-white/5 border border-white/10',
                        'text-white placeholder-white/30',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                        'transition-all duration-300'
                      )}
                      placeholder="Your company (optional)"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <label className="block text-white/80 text-sm font-medium">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg',
                        'bg-white/5 border border-white/10',
                        'text-white placeholder-white/30',
                        'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
                        'transition-all duration-300',
                        'resize-none'
                      )}
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full px-6 py-3 rounded-lg',
                        'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                        'text-white font-semibold',
                        'transform transition-all duration-300',
                        'hover:scale-[1.02] hover:shadow-lg',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'relative overflow-hidden group'
                      )}
                    >
                      <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                        animate={isSubmitting ? { x: ['0%', '100%'] } : { x: '0%' }}
                        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                      />
                    </button>
                  </motion.div>
                </form>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
              <div className="absolute -bottom-10 left-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
