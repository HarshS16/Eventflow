
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isSignup: boolean;
  userType: "organizer" | "sponsor" | "community";
  onSubmit: (data: any) => void;
}

const AuthForm = ({ isSignup, userType, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    organization: "",
    agreeToTerms: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (isSignup && !formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSignup && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-white">
            {userType === "organizer" ? "Full Name" : "Contact Name"}
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Enter your name"
            required
          />
        </motion.div>
      )}

      {isSignup && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="organization" className="text-white">
            {userType === "organizer" ? "Organization/Company" : 
             userType === "sponsor" ? "Company Name" : "Community Name"}
          </Label>
          <Input
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder={`Enter your ${userType === "community" ? "community" : "organization"} name`}
            required
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Label htmlFor="email" className="text-white">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          placeholder="Enter your email"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          placeholder="Enter your password"
          required
        />
      </motion.div>

      {isSignup && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Confirm your password"
            required
          />
        </motion.div>
      )}

      {isSignup && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-2"
        >
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-purple-500"
          />
          <Label htmlFor="terms" className="text-sm text-gray-300">
            I agree to the terms and conditions
          </Label>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          size="lg"
        >
          {isSignup ? "Create Account" : "Sign In"}
        </Button>
      </motion.div>
    </form>
  );
};

export default AuthForm;
