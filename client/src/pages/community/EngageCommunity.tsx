import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MessageSquare, Send, Users, Bell, Calendar, Clock, Hash, AtSign, Megaphone, Cloud, CloudRain, Sparkles, Heart, MessageCircle, Repeat2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const EngageCommunity = () => {
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [scheduledDate, setScheduledDate] = useState('');

  const handlePostMessage = () => {
    if (!messageContent.trim()) {
      toast({ title: "Empty message", description: "Please write something before posting", variant: "destructive" });
      return;
    }
    toast({ title: "Message Posted!", description: "Your message has been shared with the community" });
    setMessageContent('');
  };

  const handleCreateAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all announcement fields", variant: "destructive" });
      return;
    }
    toast({ title: "Announcement Created!", description: scheduledDate ? `Scheduled for ${scheduledDate}` : "Your announcement is now live" });
    setAnnouncementTitle('');
    setAnnouncementContent('');
  };

  const cloudVariants = { animate: { x: [0, 100, 0], y: [0, -20, 0], transition: { duration: 25, repeat: Infinity, ease: "linear" } } };
  const stats = [
    { label: 'Total Followers', value: '1,247', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Posts This Week', value: '0', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { label: 'Engagement Rate', value: '0%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  ];
  const recentPosts = [
    { content: "Welcome to our community! Stay tuned for exclusive events! 🎉", time: '2 hours ago', likes: 24, comments: 5 },
    { content: "Early bird tickets for next month's events go on sale tomorrow! ⏰", time: '1 day ago', likes: 56, comments: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div variants={cloudVariants} animate="animate" className="absolute top-20 left-10 text-purple-500/10"><Cloud size={100} /></motion.div>
        <motion.div variants={cloudVariants} animate="animate" style={{ animationDelay: "12s" }} className="absolute bottom-40 right-20 text-orange-500/10"><CloudRain size={80} /></motion.div>
      </div>

      <motion.div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/community/dashboard')} className="border-gray-300"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">Engage Community</h1>
            <p className="text-gray-600 text-sm">Connect and interact with your audience</p>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Tabs defaultValue="post" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="post"><MessageSquare className="w-4 h-4 mr-2" />New Post</TabsTrigger>
                <TabsTrigger value="announcement"><Megaphone className="w-4 h-4 mr-2" />Announce</TabsTrigger>
                <TabsTrigger value="schedule"><Calendar className="w-4 h-4 mr-2" />Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="post">
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="w-5 h-5 text-purple-500" />Create a Post</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea placeholder="What's happening? Share with your community..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} className="min-h-[120px] border-gray-200" />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500"><Hash className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-gray-500"><AtSign className="w-4 h-4" /></Button>
                      </div>
                      <Button onClick={handlePostMessage} className="bg-gradient-to-r from-purple-500 to-orange-500"><Send className="w-4 h-4 mr-2" />Post</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="announcement">
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Megaphone className="w-5 h-5 text-orange-500" />Create Announcement</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div><label className="text-sm font-medium mb-2 block">Title</label><Input placeholder="Enter title..." value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} /></div>
                    <div><label className="text-sm font-medium mb-2 block">Message</label><Textarea placeholder="Write announcement..." value={announcementContent} onChange={(e) => setAnnouncementContent(e.target.value)} className="min-h-[120px]" /></div>
                    <Select value={selectedAudience} onValueChange={setSelectedAudience}><SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger><SelectContent><SelectItem value="all">All Members</SelectItem><SelectItem value="active">Active Members</SelectItem></SelectContent></Select>
                    <div className="flex justify-end"><Button onClick={handleCreateAnnouncement} className="bg-gradient-to-r from-orange-500 to-pink-500"><Megaphone className="w-4 h-4 mr-2" />Broadcast</Button></div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" />Schedule Content</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea placeholder="Write your scheduled post..." className="min-h-[100px] border-gray-200" />
                    <div className="grid grid-cols-2 gap-4"><Input type="date" /><Input type="time" /></div>
                    <div className="flex justify-end"><Button className="bg-gradient-to-r from-blue-500 to-cyan-500"><Clock className="w-4 h-4 mr-2" />Schedule</Button></div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" />Recent Posts</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.time}</span>
                      <div className="flex gap-3"><span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span><span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-200">
              <CardContent className="p-6 flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
                <div><h4 className="font-semibold mb-1">Pro Tip</h4><p className="text-sm text-gray-600">Posts with emojis get 25% more engagement! ✨</p></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EngageCommunity;
