
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', href: '/', public: true },
    { label: 'Events', href: '/events', public: true },
    { label: 'About', href: '/about', public: true },
    { label: 'Contact', href: '/contact', public: true },
  ];

  const authItems = [
    { label: 'Organizer', loginHref: '/organizer/login', signupHref: '/organizer/signup' },
    { label: 'Sponsor', loginHref: '/sponsor/login', signupHref: '/sponsor/signup' },
    { label: 'Community', loginHref: '/community/login', signupHref: '/community/signup' },
  ];

  return (
    <motion.header 
      className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              EventFlow
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-purple-200 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"
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
                      // Navigate to appropriate dashboard based on user type
                      navigate('/organizer/dashboard'); // This would need to be dynamic based on user type
                    }}
                    className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20"
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
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20"
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
                    className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25"
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
            className="md:hidden text-purple-200 hover:text-white"
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
              className="absolute top-16 right-6 bg-slate-800/95 backdrop-blur-sm border border-purple-500/20 rounded-lg shadow-xl p-4 min-w-[200px]"
            >
              <div className="space-y-3">
                {authItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-200">{item.label}</h4>
                    <div className="flex space-x-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigate(item.loginHref);
                            setIsMenuOpen(false);
                          }}
                          className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20 text-xs"
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
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xs"
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
              className="md:hidden border-t border-purple-500/20 py-4"
            >
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-purple-200 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                {user && (
                  <div className="pt-4 border-t border-purple-500/20 space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigate('/organizer/dashboard');
                          setIsMenuOpen(false);
                        }}
                        className="w-full border-purple-400/30 text-purple-200 hover:bg-purple-600/20"
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
                        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20"
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
    </motion.header>
  );
};

export default Header;
