import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: 'Under $10k',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    if (!formData.service) newErrors.service = "Please select a service of interest.";
    
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        service: '',
        budget: 'Under $10k',
        message: ''
      });
      setErrors({});
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative border-t border-brand-border/50 bg-brand-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Let's Build Something Exceptional</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">Ready to scale your digital presence? Fill out the form below and our strategy team will be in touch within 24 hours.</p>
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-center font-medium overflow-hidden"
              role="alert"
            >
              Thank you! Your inquiry has been submitted successfully. We'll be in touch soon.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-8 md:p-12 rounded-2xl bg-brand-border/10 border border-brand-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors ${errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-brand-border'}`}
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-400 overflow-hidden" 
                      role="alert"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-brand-border'}`}
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-400 overflow-hidden" 
                      role="alert"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-brand-text mb-2">Service of Interest</label>
                <select 
                  id="service" 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors appearance-none ${errors.service ? 'border-red-500/50 focus:ring-red-500/50' : 'border-brand-border'}`}
                  aria-invalid={!!errors.service}
                >
                  <option value="">Select a service...</option>
                  <option value="web-development">Custom Web Development</option>
                  <option value="ui-ux">UI/UX Product Design</option>
                  <option value="cro">Conversion Optimization</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="seo">Technical SEO</option>
                </select>
                <AnimatePresence>
                  {errors.service && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-400 overflow-hidden" 
                      role="alert"
                    >
                      {errors.service}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-brand-text mb-2">Estimated Budget</label>
                <select 
                  id="budget" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-brand-bg border border-brand-border rounded-md px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors appearance-none"
                >
                  <option value="Under $10k">Under $10k</option>
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k+">$50k+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-2">Project Details</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full bg-brand-bg border rounded-md px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors resize-none ${errors.message ? 'border-red-500/50 focus:ring-red-500/50' : 'border-brand-border'}`}
                placeholder="Tell us about your goals, timeline, and any specific requirements..."
                aria-invalid={!!errors.message}
              ></textarea>
              <AnimatePresence>
                {errors.message && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-sm text-red-400 overflow-hidden" 
                    role="alert"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-brand-accent text-white font-bold rounded-md transition-colors flex justify-center items-center gap-2 shadow-[0_0_20px_var(--color-brand-accent-glow)]"
            >
              Submit Inquiry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
