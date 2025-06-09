
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    platform: [
      { label: 'For Organizers', href: '/organizer/signup' },
      { label: 'For Sponsors', href: '/sponsor/signup' },
      { label: 'For Community', href: '/community/signup' },
      { label: 'Pricing', href: '/pricing' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api' },
      { label: 'Blog', href: '/blog' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@eventflow.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'San Francisco, CA' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-purple-500/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                EventFlow
              </span>
            </motion.div>
            <p className="text-purple-200 mb-6 max-w-md">
              The complete platform connecting organizers, sponsors, and communities for seamless event management and meaningful partnerships.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-purple-200"
                  whileHover={{ x: 5 }}
                >
                  <item.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-purple-200 text-sm">Get the latest news and updates from EventFlow</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-1 text-purple-200 text-sm mb-4 md:mb-0">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>by the EventFlow team</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-purple-200 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-purple-300 text-sm">
              © {new Date().getFullYear()} EventFlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
