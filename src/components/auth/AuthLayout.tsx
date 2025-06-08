
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
    organizer: "from-purple-500 to-pink-500",
    sponsor: "from-blue-500 to-cyan-500",
    community: "from-green-500 to-emerald-500"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${gradients[userType]} rounded-xl mx-auto mb-4`} />
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
