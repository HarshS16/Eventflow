import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, DollarSign, Calendar, Plus, Search, Eye, Check, X, MessageSquare, Cloud, CloudRain, Sparkles, Building2, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const ManageSponsors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchEvents();
      fetchOpportunities();
      fetchApplications();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').eq('organizer_id', user?.id).order('created_at', { ascending: false });
    setEvents(data || []);
    if (data && data.length > 0) setSelectedEvent(data[0]);
    setLoading(false);
  };

  const fetchOpportunities = async () => {
    const { data } = await supabase.from('sponsorship_opportunities').select('*, events(title)').order('created_at', { ascending: false });
    setOpportunities(data || []);
  };

  const fetchApplications = async () => {
    const { data } = await supabase.from('sponsor_applications').select('*, sponsorship_opportunities(title, events(title)), profiles(full_name, email)').order('created_at', { ascending: false });
    setApplications(data || []);
  };

  const cloudVariants = { animate: { x: [0, 100, 0], y: [0, -20, 0], transition: { duration: 25, repeat: Infinity, ease: "linear" as const } } };

  const stats = [
    { label: 'Active Opportunities', value: opportunities.filter(o => o.status === 'open').length, icon: Target, color: 'from-orange-500 to-pink-500' },
    { label: 'Pending Applications', value: applications.filter(a => a.status === 'pending').length, icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Sponsors', value: applications.filter(a => a.status === 'approved').length, icon: Building2, color: 'from-green-500 to-emerald-500' },
  ];

  const mockSponsors = [
    { name: 'TechCorp Inc.', tier: 'Gold', amount: '$5,000', status: 'Active', event: 'Tech Summit 2025' },
    { name: 'StartupHub', tier: 'Silver', amount: '$2,500', status: 'Active', event: 'Innovation Day' },
    { name: 'CloudServices', tier: 'Bronze', amount: '$1,000', status: 'Pending', event: 'Tech Summit 2025' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div variants={cloudVariants} animate="animate" className="absolute top-20 left-10 text-orange-500/10"><Cloud size={100} /></motion.div>
        <motion.div variants={cloudVariants} animate="animate" style={{ animationDelay: "12s" }} className="absolute bottom-40 right-20 text-pink-500/10"><CloudRain size={80} /></motion.div>
      </div>

      <motion.div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/organizer/dashboard')} className="border-gray-300"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Manage Sponsors</h1>
              <p className="text-gray-600 text-sm">Create opportunities and manage sponsor relationships</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500"><Plus className="w-4 h-4 mr-2" />New Opportunity</Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-5 flex items-center justify-between">
                <div><p className="text-gray-600 text-sm">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div>
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}><stat.icon className="w-5 h-5 text-white" /></div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <Tabs defaultValue="sponsors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="sponsors"><Building2 className="w-4 h-4 mr-2" />Current Sponsors</TabsTrigger>
            <TabsTrigger value="opportunities"><Target className="w-4 h-4 mr-2" />Opportunities</TabsTrigger>
            <TabsTrigger value="applications"><Users className="w-4 h-4 mr-2" />Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="sponsors">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-orange-500" />Active Sponsors</CardTitle>
                <CardDescription>Companies currently sponsoring your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /><Input placeholder="Search sponsors..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                </div>
                {mockSponsors.length === 0 ? (
                  <div className="text-center py-12 text-gray-500"><Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" /><p>No sponsors yet</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sponsor</th><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tier</th><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Event</th><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th><th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th></tr></thead>
                      <tbody>
                        {mockSponsors.map((sponsor, i) => (
                          <motion.tr key={i} className="border-b border-gray-100 hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                            <td className="py-4 px-4 font-medium">{sponsor.name}</td>
                            <td className="py-4 px-4"><Badge className={sponsor.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : sponsor.tier === 'Silver' ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'}>{sponsor.tier}</Badge></td>
                            <td className="py-4 px-4 text-green-600 font-semibold">{sponsor.amount}</td>
                            <td className="py-4 px-4 text-gray-600">{sponsor.event}</td>
                            <td className="py-4 px-4"><Badge className={sponsor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>{sponsor.status}</Badge></td>
                            <td className="py-4 px-4 text-right"><Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4" /></Button></td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-purple-500" />Sponsorship Opportunities</CardTitle><CardDescription>Manage sponsorship packages for your events</CardDescription></div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500"><Plus className="w-4 h-4 mr-2" />Create Package</Button>
                </div>
              </CardHeader>
              <CardContent>
                {opportunities.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 mb-4">No sponsorship opportunities created</p>
                    <Button className="bg-gradient-to-r from-orange-500 to-pink-500"><Plus className="w-4 h-4 mr-2" />Create First Opportunity</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {opportunities.map((opp, i) => (
                      <motion.div key={opp.id} whileHover={{ scale: 1.02 }} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{opp.title}</h4>
                          <Badge className={opp.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>{opp.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{opp.events?.title}</p>
                        <p className="text-green-600 font-semibold">${opp.budget_min} - ${opp.budget_max}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" />Sponsor Applications</CardTitle>
                <CardDescription>Review and manage incoming sponsorship requests</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No applications yet</p>
                    <p className="text-sm mt-2">Applications will appear here when sponsors apply to your opportunities</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app, i) => (
                      <motion.div key={app.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                        <div>
                          <h4 className="font-medium">{app.profiles?.full_name || 'Unknown'}</h4>
                          <p className="text-sm text-gray-600">{app.sponsorship_opportunities?.title}</p>
                          <p className="text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>{app.status}</Badge>
                          {app.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600"><Check className="w-4 h-4" /></Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600"><X className="w-4 h-4" /></Button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageSponsors;
