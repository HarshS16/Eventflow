import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, DollarSign, BarChart3, Settings, LogOut, Cloud, CloudRain, Sparkles, Share2, Eye, Ticket, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CreateEventModal from '@/components/CreateEventModal';
import EventRegistrations from '@/components/EventRegistrations';
import RoleSwitcher from '@/components/RoleSwitcher';
import { useToast } from '@/hooks/use-toast';
import { IssueTicketsModal, TicketScanner } from '@/components/tickets';

const OrganizerDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState<any>(null);
  const [issueTicketsEvent, setIssueTicketsEvent] = useState<any>(null);
  const [scannerEvent, setScannerEvent] = useState<any>(null);
  const [registrationCounts, setRegistrationCounts] = useState<Record<string, number>>({});

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
      .eq('organizer_id', user?.id)
      .order('created_at', { ascending: false });
    setEvents(data || []);
    setLoading(false);
    // Fetch registration counts for each event
    if (data && data.length > 0) {
      fetchRegistrationCounts(data.map((e: any) => e.id));
    }
  };

  const fetchRegistrationCounts = async (eventIds: string[]) => {
    const counts: Record<string, number> = {};
    for (const eventId of eventIds) {
      const { count } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('status', 'approved');
      counts[eventId] = count || 0;
    }
    setRegistrationCounts(counts);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const shareEvent = (eventId: string, eventTitle: string) => {
    const eventUrl = `${window.location.origin}/event/${eventId}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: `Share link for "${eventTitle}" has been copied to clipboard`,
      });
    }).catch(() => {
      toast({
        title: "Share Link",
        description: eventUrl,
      });
    });
  };

  const stats = [
    { title: 'Total Events', value: events.length, icon: Calendar, color: 'from-orange-500 to-pink-500' },
    { title: 'Published Events', value: events.filter(e => e.status === 'published').length, icon: Users, color: 'from-pink-500 to-purple-500' },
    { title: 'Total Revenue', value: '$0', icon: DollarSign, color: 'from-purple-500 to-orange-500' },
    { title: 'Analytics', value: 'View', icon: BarChart3, color: 'from-orange-500 to-pink-500' },
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
          className="absolute top-20 left-10 text-orange-500/10"
        >
          <Cloud size={100} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "10s" }}
          className="absolute bottom-40 right-20 text-pink-500/10"
        >
          <CloudRain size={80} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "15s" }}
          className="absolute top-60 left-1/3 text-purple-500/10"
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
              Event Organizer Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <RoleSwitcher currentRole="organizer" />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={() => navigate('/settings')} className="border-gray-300 text-gray-700 hover:bg-gray-50">
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

        {/* Quick Actions */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 h-16 w-full shadow-lg shadow-orange-500/25 group"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                Create New Event
                <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-16 w-full"
                onClick={() => navigate('/organizer/sponsors')}
              >
                Manage Sponsors
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-16 w-full"
                onClick={() => navigate('/organizer/analytics')}
              >
                View Analytics
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Your Events</h2>
          {loading ? (
            <div className="text-center py-8">
              <motion.div 
                className="text-gray-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading events...
              </motion.div>
            </div>
          ) : events.length === 0 ? (
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-medium text-black mb-2">No events yet</h3>
                <p className="text-gray-600 mb-6">Create your first event to get started</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg shadow-orange-500/25"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
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
                        <Badge 
                          variant={event.status === 'published' ? 'default' : 'secondary'}
                          className={event.status === 'published' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300'}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {event.event_date && (
                          <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
                        )}
                        {event.location && <p>Location: {event.location}</p>}
                        {event.max_attendees && <p>Max Attendees: {event.max_attendees}</p>}
                      </div>
                      
                      {event.status === 'published' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => shareEvent(event.id, event.title)}
                                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedEventForRegistrations(event)}
                                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Registrations
                              </Button>
                            </motion.div>
                          </div>
                          {/* Ticket Actions */}
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                size="sm"
                                onClick={() => setIssueTicketsEvent(event)}
                                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                                disabled={!registrationCounts[event.id]}
                              >
                                <Ticket className="w-4 h-4 mr-2" />
                                Issue QR ({registrationCounts[event.id] || 0})
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setScannerEvent(event)}
                                className="w-full border-green-300 text-green-600 hover:bg-green-50"
                              >
                                <QrCode className="w-4 h-4 mr-2" />
                                Scan QR
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Event Registrations Modal */}
        {selectedEventForRegistrations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEventForRegistrations(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setSelectedEventForRegistrations(null)}
                  className="absolute top-4 right-4 z-10 bg-white border-gray-300"
                >
                  Close
                </Button>
                <EventRegistrations
                  eventId={selectedEventForRegistrations.id}
                  eventTitle={selectedEventForRegistrations.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <CreateEventModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={fetchEvents}
      />

      {/* Issue Tickets Modal */}
      {issueTicketsEvent && (
        <IssueTicketsModal
          eventId={issueTicketsEvent.id}
          eventTitle={issueTicketsEvent.title}
          approvedCount={registrationCounts[issueTicketsEvent.id] || 0}
          isOpen={!!issueTicketsEvent}
          onClose={() => setIssueTicketsEvent(null)}
          onSuccess={() => {
            // Optionally refresh data
          }}
        />
      )}

      {/* QR Scanner */}
      {scannerEvent && (
        <TicketScanner
          eventId={scannerEvent.id}
          eventTitle={scannerEvent.title}
          isOpen={!!scannerEvent}
          onClose={() => setScannerEvent(null)}
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;
