import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  Link2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  Download, 
  Calendar, 
  MapPin, 
  Users, 
  Check,
  Sparkles,
  Cloud,
  CloudRain,
  ExternalLink,
  QrCode,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const PromoteEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    setEvents(data || []);
    setLoading(false);
    if (data && data.length > 0) {
      setSelectedEvent(data[0]);
    }
  };

  const generateReferralLink = (eventId: string) => {
    return `${window.location.origin}/event/${eventId}?ref=${user?.id}`;
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedLink(type);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const shareToSocial = (platform: string, event: any) => {
    const referralLink = generateReferralLink(event.id);
    const text = `Check out ${event.title}! 🎉`;
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent(event.title)}`,
      email: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(`${text}\n\n${referralLink}`)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const cloudVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, -20, 0],
      transition: {
        duration: 25,
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
      transition: {
        duration: 0.5
      }
    }
  };

  const socialPlatforms = [
    { name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600', key: 'twitter' },
    { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800', key: 'facebook' },
    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-900', key: 'linkedin' },
    { name: 'Email', icon: Mail, color: 'from-gray-500 to-gray-700', key: 'email' },
  ];

  const promotionalAssets = [
    { name: 'Event Banner', description: 'High-res banner for social media', icon: ImageIcon, format: '1200x630px' },
    { name: 'Story Template', description: 'Vertical template for stories', icon: ImageIcon, format: '1080x1920px' },
    { name: 'QR Code', description: 'Scannable QR code with your referral', icon: QrCode, format: 'SVG/PNG' },
    { name: 'Email Template', description: 'Pre-written email for outreach', icon: Mail, format: 'HTML' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 left-10 text-purple-500/10"
        >
          <Cloud size={100} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "12s" }}
          className="absolute bottom-40 right-20 text-orange-500/10"
        >
          <CloudRain size={80} />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/community/dashboard')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
                Promote Events
              </h1>
              <p className="text-gray-600 text-sm">Share events and earn commissions</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {loading ? (
          <div className="text-center py-20">
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
            <CardContent className="p-12 text-center">
              <Share2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">No events to promote</h3>
              <p className="text-gray-600">Check back later for new promotional opportunities</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Selection Sidebar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Event</h2>
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <Card className={`cursor-pointer transition-all ${selectedEvent?.id === event.id 
                    ? 'border-purple-500 bg-purple-50/50 shadow-lg shadow-purple-500/10' 
                    : 'bg-white border-gray-200 hover:border-gray-300'}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-black line-clamp-1">{event.title}</h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            {event.event_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.event_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedEvent?.id === event.id && (
                          <Badge className="bg-purple-500 text-white">Selected</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Promotion Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              {selectedEvent && (
                <Tabs defaultValue="share" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    <TabsTrigger value="share" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </TabsTrigger>
                    <TabsTrigger value="assets" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Assets
                    </TabsTrigger>
                    <TabsTrigger value="tracking" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Link2 className="w-4 h-4 mr-2" />
                      Tracking
                    </TabsTrigger>
                  </TabsList>

                  {/* Share Tab */}
                  <TabsContent value="share" className="space-y-6">
                    {/* Event Preview */}
                    <Card className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-purple-500 to-orange-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-white/50" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-black mb-2">{selectedEvent.title}</h3>
                        <p className="text-gray-600 line-clamp-2 mb-4">{selectedEvent.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          {selectedEvent.event_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(selectedEvent.event_date).toLocaleDateString()}
                            </span>
                          )}
                          {selectedEvent.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {selectedEvent.location}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Referral Link */}
                    <Card className="bg-white border border-gray-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Link2 className="w-5 h-5 text-purple-500" />
                          Your Referral Link
                        </CardTitle>
                        <CardDescription>Share this link to earn 15% commission on each ticket sale</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Input 
                            readOnly 
                            value={generateReferralLink(selectedEvent.id)}
                            className="flex-1 bg-gray-50 border-gray-200"
                          />
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              onClick={() => copyToClipboard(generateReferralLink(selectedEvent.id), 'referral')}
                              className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600"
                            >
                              {copiedLink === 'referral' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Social Sharing */}
                    <Card className="bg-white border border-gray-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Share on Social Media</CardTitle>
                        <CardDescription>One-click sharing to your favorite platforms</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {socialPlatforms.map((platform) => (
                            <motion.div 
                              key={platform.key}
                              whileHover={{ scale: 1.05 }} 
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                onClick={() => shareToSocial(platform.key, selectedEvent)}
                                className={`w-full bg-gradient-to-r ${platform.color} text-white`}
                              >
                                <platform.icon className="w-4 h-4 mr-2" />
                                {platform.name}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Assets Tab */}
                  <TabsContent value="assets" className="space-y-6">
                    <Card className="bg-white border border-gray-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Promotional Materials</CardTitle>
                        <CardDescription>Download ready-to-use promotional assets</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {promotionalAssets.map((asset, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center">
                                  <asset.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-black">{asset.name}</h4>
                                  <p className="text-sm text-gray-600">{asset.description}</p>
                                  <Badge variant="outline" className="mt-2 text-xs">{asset.format}</Badge>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Caption Templates */}
                    <Card className="bg-white border border-gray-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Caption Templates</CardTitle>
                        <CardDescription>Copy-paste ready captions for your posts</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          `🎉 Don't miss ${selectedEvent.title}! An event you won't want to skip. Get your tickets now! 🎟️`,
                          `📅 Mark your calendars! ${selectedEvent.title} is coming up. Early bird tickets available! ⏳`,
                          `✨ Looking for something exciting? ${selectedEvent.title} is THE event to be at. Link in bio! 🔗`
                        ].map((caption, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-700 mb-3">{caption}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(caption, `caption-${index}`)}
                            >
                              {copiedLink === `caption-${index}` ? <Check className="w-3 h-3 mr-2" /> : <Copy className="w-3 h-3 mr-2" />}
                              Copy
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tracking Tab */}
                  <TabsContent value="tracking" className="space-y-6">
                    <Card className="bg-white border border-gray-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Link Performance</CardTitle>
                        <CardDescription>Track how your promotional links are performing</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {[
                            { label: 'Total Clicks', value: '0', change: '+0%' },
                            { label: 'Conversions', value: '0', change: '+0%' },
                            { label: 'Earnings', value: '$0', change: '+0%' },
                          ].map((stat, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                            >
                              <p className="text-sm text-gray-600">{stat.label}</p>
                              <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
                              <span className="text-xs text-green-600">{stat.change} this week</span>
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-center py-8 text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No activity yet. Start sharing to see your performance!</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoteEvents;
