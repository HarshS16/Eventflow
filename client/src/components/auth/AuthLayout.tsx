
import { motion } from "framer-motion";
import { ArrowLeft, Cloud, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  userType: "organizer" | "sponsor" | "community" | "participant";
}

const AuthLayout = ({ children, title, subtitle, userType }: AuthLayoutProps) => {
  const navigate = useNavigate();

  const gradients = {
    organizer: "from-orange-500 to-pink-500",
    sponsor: "from-pink-500 to-orange-500",
    community: "from-orange-500 to-pink-500",
    participant: "from-orange-500 to-pink-500"
  };

  const cloudVariants = {
    animate: {
      x: [0, 50, 0],
      y: [0, -10, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 left-10 text-orange-500/10"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "7s" }}
          className="absolute bottom-20 right-10 text-pink-500/10"
        >
          <CloudRain size={100} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-gray-600 hover:text-black hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-2xl shadow-gray-500/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className={`w-16 h-16 bg-gradient-to-r ${gradients[userType]} rounded-xl mx-auto mb-4 shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h1 
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
