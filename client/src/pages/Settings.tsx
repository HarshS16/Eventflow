import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Bell, Shield, Palette, Save, Cloud, CloudRain, Sparkles, Mail, Phone, Globe, Camera, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      setBio(data.bio || '');
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ full_name: fullName, phone, bio, updated_at: new Date().toISOString() }).eq('id', user?.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Your profile has been updated" });
    }
  };

  const handleSaveNotifications = () => {
    toast({ title: "Saved!", description: "Notification preferences updated" });
  };

  const handleSavePrivacy = () => {
    toast({ title: "Saved!", description: "Privacy settings updated" });
  };

  const goBack = () => {
    const role = profile?.role || 'participant';
    navigate(`/${role}/dashboard`);
  };

  const cloudVariants = { animate: { x: [0, 100, 0], y: [0, -20, 0], transition: { duration: 25, repeat: Infinity, ease: "linear" as const } } };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Loader2 className="w-8 h-8 text-orange-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div variants={cloudVariants} animate="animate" className="absolute top-20 left-10 text-purple-500/10"><Cloud size={100} /></motion.div>
        <motion.div variants={cloudVariants} animate="animate" style={{ animationDelay: "12s" }} className="absolute bottom-40 right-20 text-orange-500/10"><CloudRain size={80} /></motion.div>
      </div>

      <motion.div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={goBack} className="border-gray-300"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">Settings</h1>
            <p className="text-gray-600 text-sm">Manage your account preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />Profile</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="w-4 h-4 mr-2" />Privacy</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" />Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-purple-500" />Profile Information</CardTitle>
                  <CardDescription>Update your personal details and public profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max 2MB.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ''} disabled className="bg-gray-50" />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Account Type</Label>
                      <Input id="role" value={profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1) || 'User'} disabled className="bg-gray-50 capitalize" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." className="w-full min-h-[100px] px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={saving} className="bg-gradient-to-r from-purple-500 to-orange-500">
                      {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-orange-500" />Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div><p className="font-medium">Email Notifications</p><p className="text-sm text-gray-500">Receive updates via email</p></div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div><p className="font-medium">Event Reminders</p><p className="text-sm text-gray-500">Get notified before events start</p></div>
                      </div>
                      <Switch checked={eventReminders} onCheckedChange={setEventReminders} />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <div><p className="font-medium">Push Notifications</p><p className="text-sm text-gray-500">Browser push notifications</p></div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-gray-600" />
                        <div><p className="font-medium">Marketing Emails</p><p className="text-sm text-gray-500">Receive promotional content</p></div>
                      </div>
                      <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-orange-500 to-pink-500">
                      <Check className="w-4 h-4 mr-2" />Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-green-500" />Privacy & Security</CardTitle>
                  <CardDescription>Control your privacy settings and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                          <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                          <SelectItem value="connections">Connections Only - Only your connections</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div><p className="font-medium">Show Email Address</p><p className="text-sm text-gray-500">Display your email on your public profile</p></div>
                      <Switch checked={showEmail} onCheckedChange={setShowEmail} />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-red-600">Danger Zone</h3>
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium text-red-700">Delete Account</p><p className="text-sm text-red-600">Permanently delete your account and all data</p></div>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">Delete Account</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePrivacy} className="bg-gradient-to-r from-green-500 to-emerald-500">
                      <Check className="w-4 h-4 mr-2" />Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-pink-500" />Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'System'].map((theme) => (
                        <motion.div key={theme} whileHover={{ scale: 1.02 }} className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${theme === 'Light' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <div className={`w-8 h-8 mx-auto mb-2 rounded-full ${theme === 'Light' ? 'bg-white border border-gray-300' : theme === 'Dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'}`} />
                          <p className="font-medium">{theme}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Accent Color</Label>
                    <div className="flex gap-3">
                      {[
                        { name: 'Purple', colors: 'from-purple-500 to-orange-500' },
                        { name: 'Blue', colors: 'from-blue-500 to-cyan-500' },
                        { name: 'Green', colors: 'from-green-500 to-emerald-500' },
                        { name: 'Pink', colors: 'from-pink-500 to-rose-500' },
                      ].map((color, i) => (
                        <motion.div key={color.name} whileHover={{ scale: 1.1 }} className={`w-10 h-10 rounded-full bg-gradient-to-r ${color.colors} cursor-pointer ${i === 0 ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`} title={color.name} />
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <p className="text-sm text-gray-600">More customization options coming soon!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
