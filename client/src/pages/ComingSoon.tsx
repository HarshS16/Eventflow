import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles, Cloud, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const ComingSoon = () => {
  const navigate = useNavigate();

  const cloudVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, -20, 0],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden min-h-[80vh] flex items-center justify-center">
        {/* Animated Background Clouds */}
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
            style={{ animationDelay: "10s" }}
            className="absolute bottom-20 right-10 text-pink-500/10"
          >
            <CloudRain size={100} />
          </motion.div>
          <motion.div
            variants={cloudVariants}
            animate="animate"
            style={{ animationDelay: "20s" }}
            className="absolute top-1/2 left-1/3 text-purple-500/10"
          >
            <Cloud size={150} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center mb-8"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Clock className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-6 py-3 mb-8 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 font-medium">Something Amazing is Brewing</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Coming Soon
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We're working hard to bring you this feature. Stay tuned for updates as we continue to build the future of event management.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg shadow-2xl shadow-orange-500/25 group"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                  onClick={() => navigate("/organizer/signup")}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              className="mt-16 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Development Progress</span>
                  <span className="text-sm font-bold text-gray-900">In Progress</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoon;
