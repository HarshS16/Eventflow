
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', href: '/#home', public: true },
    { label: 'Events', href: '/#events', public: true },
    { label: 'About', href: '/#about', public: true },
    { label: 'Contact', href: '/#contact', public: true },
  ];

  const authItems = [
    { label: 'Organizer', loginHref: '/organizer/login', signupHref: '/organizer/signup' },
    { label: 'Sponsor', loginHref: '/sponsor/login', signupHref: '/sponsor/signup' },
    { label: 'Community', loginHref: '/community/login', signupHref: '/community/signup' },
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'mx-4 mt-4' 
          : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg mx-auto max-w-6xl' 
            : 'bg-transparent'
        }`}
        layout
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer h-16"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/Rheo-logo.png" 
                alt="Rheo" 
                className="w-24 h-24 object-contain translate-y-[2px]" 
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors relative group"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    // Smooth scroll for in-page sections
                    if (item.href.startsWith('/#')) {
                      e.preventDefault();
                      const id = item.href.split('#')[1];
                      const el = document.getElementById(id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        navigate('/');
                      }
                    }
                  }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate('/organizer/dashboard');
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/25"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Auth Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && !user && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 right-6 bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl p-4 min-w-[200px]"
              >
                <div className="space-y-3">
                  {authItems.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">{item.label}</h4>
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigate(item.loginHref);
                              setIsMenuOpen(false);
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
                          >
                            Login
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={() => {
                              navigate(item.signupHref);
                              setIsMenuOpen(false);
                            }}
                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs"
                          >
                            Sign Up
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-gray-200 py-4"
              >
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="block text-gray-700 hover:text-black transition-colors"
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        if (item.href.startsWith('/#')) {
                          e.preventDefault();
                          const id = item.href.split('#')[1];
                          const el = document.getElementById(id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          } else {
                            navigate('/');
                          }
                        }
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  {user && (
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigate('/organizer/dashboard');
                            setIsMenuOpen(false);
                          }}
                          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Dashboard
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleSignOut();
                            setIsMenuOpen(false);
                          }}
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
