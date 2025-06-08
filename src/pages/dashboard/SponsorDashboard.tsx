
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Target, DollarSign, TrendingUp, Settings, LogOut, Eye } from 'lucide-react';
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
    { title: 'Available Opportunities', value: opportunities.length, icon: Target, color: 'from-blue-500 to-cyan-500' },
    { title: 'Active Sponsorships', value: 0, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { title: 'Total Investment', value: '$0', icon: DollarSign, color: 'from-purple-500 to-pink-500' },
    { title: 'ROI', value: '0%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Sponsor Dashboard</h1>
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

        {/* Search and Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Find Sponsorship Opportunities</h2>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Filter
            </Button>
          </div>
        </div>

        {/* Sponsorship Opportunities */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Available Opportunities</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading opportunities...</div>
            </div>
          ) : opportunities.length === 0 ? (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No opportunities available</h3>
                <p className="text-gray-400">Check back later for new sponsorship opportunities</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white">{opportunity.title}</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        {opportunity.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {opportunity.events?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm">{opportunity.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Budget Range</span>
                        <span className="text-green-400 font-medium">
                          ${opportunity.budget_min} - ${opportunity.budget_max}
                        </span>
                      </div>
                      {opportunity.events?.event_date && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Event Date</span>
                          <span className="text-white">
                            {new Date(opportunity.events.event_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="pt-3">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          <Eye className="w-4 h-4 mr-2" />
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

export default SponsorDashboard;
