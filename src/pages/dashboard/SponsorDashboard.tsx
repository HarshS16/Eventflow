
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Target, DollarSign, TrendingUp, Settings, LogOut, Eye, Cloud, CloudRain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SponsorDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOpportunities();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();
    setProfile(data);
  };

  const fetchOpportunities = async () => {
    const { data } = await supabase
      .from('sponsorship_opportunities')
      .select(`
        *,
        events(title, event_date, location)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    setOpportunities(data || []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    { title: 'Available Opportunities', value: opportunities.length, icon: Target, color: 'from-blue-600 to-indigo-600' },
    { title: 'Active Sponsorships', value: 0, icon: TrendingUp, color: 'from-indigo-600 to-purple-600' },
    { title: 'Total Investment', value: '$0', icon: DollarSign, color: 'from-purple-600 to-blue-600' },
    { title: 'ROI', value: '0%', icon: TrendingUp, color: 'from-blue-600 to-cyan-600' },
  ];

  const cloudVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, -20, 0],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear"
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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 right-10 text-blue-400/10"
        >
          <Cloud size={100} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "8s" }}
          className="absolute bottom-40 left-20 text-indigo-400/10"
        >
          <CloudRain size={80} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "16s" }}
          className="absolute top-60 left-1/2 text-blue-400/10"
        >
          <Cloud size={120} />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        className="border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Sponsor Dashboard
            </h1>
            <p className="text-blue-200">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="border-blue-400/30 text-blue-200 hover:bg-blue-600/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all shadow-lg shadow-blue-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Find Sponsorship Opportunities</h2>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <motion.input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-blue-500/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-blue-400/30 text-blue-200 hover:bg-blue-600/20">
                Filter
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Sponsorship Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Available Opportunities</h2>
          {loading ? (
            <div className="text-center py-8">
              <motion.div 
                className="text-blue-200"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading opportunities...
              </motion.div>
            </div>
          ) : opportunities.length === 0 ? (
            <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-medium text-white mb-2">No opportunities available</h3>
                <p className="text-blue-200">Check back later for new sponsorship opportunities</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all shadow-lg shadow-blue-500/10 h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white">{opportunity.title}</CardTitle>
                        <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                          {opportunity.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-blue-200">
                        {opportunity.events?.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-blue-100 text-sm">{opportunity.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-blue-200">Budget Range</span>
                          <span className="text-green-400 font-medium">
                            ${opportunity.budget_min} - ${opportunity.budget_max}
                          </span>
                        </div>
                        {opportunity.events?.event_date && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-blue-200">Event Date</span>
                            <span className="text-white">
                              {new Date(opportunity.events.event_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div className="pt-3">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 group">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                              <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorDashboard;
