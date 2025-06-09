
import { motion } from "framer-motion";
import { ArrowLeft, Cloud, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  userType: "organizer" | "sponsor" | "community";
}

const AuthLayout = ({ children, title, subtitle, userType }: AuthLayoutProps) => {
  const navigate = useNavigate();

  const gradients = {
    organizer: "from-purple-600 to-blue-600",
    sponsor: "from-blue-600 to-indigo-600",
    community: "from-indigo-600 to-purple-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 left-10 text-purple-400/10"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "7s" }}
          className="absolute bottom-20 right-10 text-blue-400/10"
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
          className="mb-8 text-purple-200 hover:text-white hover:bg-purple-600/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div 
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 shadow-2xl shadow-purple-500/20"
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
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-purple-200"
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
