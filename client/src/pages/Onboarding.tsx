import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Target, Globe, CheckCircle, ArrowRight, Cloud, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MagicCard } from "@/components/ui/magic-card";

interface RoleType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
}

const roles: RoleType[] = [
  {
    id: "organizer",
    title: "Event Organizer",
    description: "Create, manage, and promote your events with powerful tools.",
    icon: Users,
    color: "from-orange-500 to-pink-500",
    features: ["Event Management", "Sponsor Matching", "Analytics Dashboard", "Ticket Sales"]
  },
  {
    id: "sponsor",
    title: "Sponsor",
    description: "Discover partnership opportunities aligned with your brand.",
    icon: Target,
    color: "from-pink-500 to-purple-500",
    features: ["Event Discovery", "ROI Tracking", "Brand Exposure", "Partnership Management"]
  },
  {
    id: "community",
    title: "Community Partner",
    description: "Amplify local events and strengthen community connections.",
    icon: Globe,
    color: "from-purple-500 to-orange-500",
    features: ["Community Events", "Local Networking", "Resource Sharing", "Impact Measurement"]
  },
  {
    id: "participant",
    title: "Event Participant",
    description: "Discover and register for events that match your interests.",
    icon: Users,
    color: "from-orange-500 to-pink-500",
    features: ["Event Discovery", "Easy Registration", "Personal Dashboard", "Community Connections"]
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [existingRoles, setExistingRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingRoles, setCheckingRoles] = useState(true);

  useEffect(() => {
    const checkExistingRoles = async () => {
      if (!user) {
        setCheckingRoles(false);
        return;
      }

      try {
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        // If table doesn't exist or query errors, just continue with empty roles
        if (error) {
          console.log('user_roles table may not exist yet, continuing with empty roles:', error.message);
          setCheckingRoles(false);
          return;
        }

        if (roles && roles.length > 0) {
          const roleIds = roles.map(r => r.role);
          setExistingRoles(roleIds);
          setSelectedRoles(roleIds);
        }
      } catch (error) {
        console.error('Error checking roles:', error);
        // Continue with empty roles if there's an error
      } finally {
        setCheckingRoles(false);
      }
    };

    if (!authLoading) {
      checkExistingRoles();
    }
  }, [user, authLoading]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    );
  };

  const handleContinue = async () => {
    if (selectedRoles.length === 0) {
      toast({
        title: "Select at least one role",
        description: "Please select at least one role to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in to continue.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Remove roles that were deselected
      const rolesToRemove = existingRoles.filter(r => !selectedRoles.includes(r));
      if (rolesToRemove.length > 0) {
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', user.id)
          .in('role', rolesToRemove);
      }

      // Add new roles
      const rolesToAdd = selectedRoles.filter(r => !existingRoles.includes(r));
      if (rolesToAdd.length > 0) {
        const newRoles = rolesToAdd.map((role, index) => ({
          user_id: user.id,
          role,
          is_primary: existingRoles.length === 0 && index === 0 // First role is primary if no existing
        }));

        const { error } = await supabase
          .from('user_roles')
          .insert(newRoles);

        if (error) throw error;
      }

      // Update profile user_type to primary role (for backward compatibility)
      const primaryRole = selectedRoles[0];
      await supabase
        .from('profiles')
        .update({ user_type: primaryRole })
        .eq('id', user.id);

      toast({
        title: "Roles Updated!",
        description: "Your account has been set up successfully.",
      });

      // Navigate to primary role dashboard
      navigate(`/${primaryRole}/dashboard`);
    } catch (error: any) {
      console.error('Error saving roles:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save roles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const cloudVariants = {
    animate: {
      x: [0, 50, 0],
      y: [0, -10, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (authLoading || checkingRoles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      {/* Animated Background */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
            {existingRoles.length > 0 ? "Manage Your Roles" : "Choose Your Role"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {existingRoles.length > 0 
              ? "Update your roles or add new ones. You can have multiple roles."
              : "Select one or more roles that describe how you'll use Rheo. You can always add more later."
            }
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {roles.map((role, index) => {
            const isSelected = selectedRoles.includes(role.id);
            return (
              <motion.div
                key={role.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => toggleRole(role.id)}
                className="cursor-pointer"
              >
                <Card className={`w-full border-2 p-0 shadow-none h-full transition-all ${
                  isSelected 
                    ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
                    : 'border-transparent hover:border-gray-200'
                }`}>
                  <MagicCard
                    gradientColor={index % 2 === 0 ? "rgba(251, 146, 60, 0.3)" : "rgba(236, 72, 153, 0.3)"}
                    gradientSize={250}
                    gradientOpacity={isSelected ? 0.8 : 0.4}
                    className="bg-white border border-gray-200 hover:shadow-xl transition-all h-full"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="relative">
                        <motion.div 
                          className={`w-14 h-14 bg-gradient-to-r ${role.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <role.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <CardTitle className="text-xl text-black">{role.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-sm">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {role.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </MagicCard>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4">
            {selectedRoles.length === 0 
              ? "Select at least one role to continue"
              : `${selectedRoles.length} role${selectedRoles.length > 1 ? 's' : ''} selected`
            }
          </p>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selectedRoles.length === 0 || loading}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-4 text-lg shadow-2xl shadow-orange-500/25 group"
          >
            {loading ? "Saving..." : "Continue"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
