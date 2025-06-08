
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, DollarSign, TrendingUp, Settings, LogOut, Share2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CommunityDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchEvents();
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

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    setEvents(data || []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    { title: 'Available Events', value: events.length, icon: Heart, color: 'from-green-500 to-emerald-500' },
    { title: 'Community Size', value: '1.2K', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Monthly Earnings', value: '$0', icon: DollarSign, color: 'from-purple-500 to-pink-500' },
    { title: 'Engagement Rate', value: '0%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Community Partner Dashboard</h1>
            <p className="text-gray-400">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="border-red-500/20 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Community Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-16">
              <Share2 className="w-5 h-5 mr-2" />
              Promote Events
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16">
              <MessageSquare className="w-5 h-5 mr-2" />
              Engage Community
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Promotional Opportunities */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Events to Promote</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading events...</div>
            </div>
          ) : events.length === 0 ? (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No events available</h3>
                <p className="text-gray-400">Check back later for new events to promote</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white">{event.title}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        Active
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {event.event_date && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Date</span>
                          <span className="text-white">
                            {new Date(event.event_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Location</span>
                          <span className="text-white">{event.location}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Commission</span>
                        <span className="text-green-400 font-medium">15%</span>
                      </div>
                      <div className="pt-3 space-y-2">
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                          <Share2 className="w-4 h-4 mr-2" />
                          Promote Event
                        </Button>
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
