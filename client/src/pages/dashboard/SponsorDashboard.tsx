import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Target, DollarSign, TrendingUp, Settings, LogOut, Eye, Cloud, CloudRain, Sparkles, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SponsorDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOpportunities();
      fetchLiveEvents();
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

  const fetchLiveEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('event_date', { ascending: true });
    setLiveEvents(data || []);
    setEventsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    { title: 'Available Opportunities', value: opportunities.length, icon: Target, color: 'from-pink-500 to-purple-500' },
    { title: 'Live Events', value: liveEvents.length, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { title: 'Active Sponsorships', value: 0, icon: TrendingUp, color: 'from-purple-500 to-orange-500' },
    { title: 'Total Investment', value: '$0', icon: DollarSign, color: 'from-orange-500 to-pink-500' },
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 right-10 text-pink-500/10"
        >
          <Cloud size={100} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "8s" }}
          className="absolute bottom-40 left-20 text-purple-500/10"
        >
          <CloudRain size={80} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "16s" }}
          className="absolute top-60 left-1/2 text-orange-500/10"
        >
          <Cloud size={120} />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Sponsor Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-red-300 text-red-600 hover:bg-red-50">
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
              <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-black">{stat.value}</p>
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
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Find Sponsorship Opportunities</h2>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <motion.input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
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
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Available Opportunities</h2>
          {loading ? (
            <div className="text-center py-8">
              <motion.div 
                className="text-gray-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading opportunities...
              </motion.div>
            </div>
          ) : opportunities.length === 0 ? (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Target className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-medium text-black mb-2">No opportunities available</h3>
                <p className="text-gray-600">Check back later for new sponsorship opportunities</p>
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
                  <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all shadow-lg h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-black">{opportunity.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          {opportunity.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">
                        {opportunity.events?.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-gray-700 text-sm">{opportunity.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Budget Range</span>
                          <span className="text-green-600 font-medium">
                            ${opportunity.budget_min} - ${opportunity.budget_max}
                          </span>
                        </div>
                        {opportunity.events?.event_date && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Event Date</span>
                            <span className="text-black">
                              {new Date(opportunity.events.event_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        <div className="pt-3">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-500/25 group">
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

        {/* Live Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Live Events</h2>
          {eventsLoading ? (
            <div className="text-center py-8">
              <motion.div 
                className="text-gray-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading events...
              </motion.div>
            </div>
          ) : liveEvents.length === 0 ? (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-medium text-black mb-2">No live events available</h3>
                <p className="text-gray-600">Check back later for new events</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all shadow-lg h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-black">{event.title}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                          {event.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">
                        {event.description?.substring(0, 100)}{event.description?.length > 100 ? '...' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {event.event_date && (
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-600">
                              {new Date(event.event_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-600">{event.location}</span>
                          </div>
                        )}
                        {event.ticket_price && (
                          <div className="flex items-center text-sm">
                            <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-green-600 font-medium">
                              ${event.ticket_price}
                            </span>
                          </div>
                        )}
                        <div className="pt-3">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              variant="outline" 
                              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                              onClick={() => navigate(`/event/${event.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Event
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