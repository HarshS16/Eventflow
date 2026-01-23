import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, TrendingUp, Users, DollarSign, Eye, MousePointer, Target, Calendar, ArrowUpRight, ArrowDownRight, Cloud, CloudRain, BarChart3, PieChart, Activity, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CommunityAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');

  const cloudVariants = { animate: { x: [0, 100, 0], y: [0, -20, 0], transition: { duration: 25, repeat: Infinity, ease: "linear" } } };

  const mainStats = [
    { label: 'Total Impressions', value: '12,456', change: '+12.5%', isPositive: true, icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { label: 'Link Clicks', value: '847', change: '+8.3%', isPositive: true, icon: MousePointer, color: 'from-purple-500 to-pink-500' },
    { label: 'Conversions', value: '23', change: '-2.1%', isPositive: false, icon: Target, color: 'from-green-500 to-emerald-500' },
    { label: 'Earnings', value: '$156.00', change: '+15.7%', isPositive: true, icon: DollarSign, color: 'from-orange-500 to-red-500' },
  ];

  const topEvents = [
    { name: 'Music Festival 2025', clicks: 245, conversions: 12, earnings: '$78.00' },
    { name: 'Tech Conference', clicks: 189, conversions: 8, earnings: '$52.00' },
    { name: 'Art Exhibition', clicks: 156, conversions: 3, earnings: '$26.00' },
  ];

  const weeklyData = [
    { day: 'Mon', value: 65 }, { day: 'Tue', value: 85 }, { day: 'Wed', value: 45 },
    { day: 'Thu', value: 95 }, { day: 'Fri', value: 120 }, { day: 'Sat', value: 80 }, { day: 'Sun', value: 55 },
  ];
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  const audienceData = [
    { source: 'Instagram', percentage: 45, color: 'bg-pink-500' },
    { source: 'Twitter', percentage: 25, color: 'bg-blue-500' },
    { source: 'Facebook', percentage: 18, color: 'bg-blue-700' },
    { source: 'Direct', percentage: 12, color: 'bg-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div variants={cloudVariants} animate="animate" className="absolute top-20 left-10 text-purple-500/10"><Cloud size={100} /></motion.div>
        <motion.div variants={cloudVariants} animate="animate" style={{ animationDelay: "12s" }} className="absolute bottom-40 right-20 text-orange-500/10"><CloudRain size={80} /></motion.div>
      </div>

      <motion.div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/community/dashboard')} className="border-gray-300"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">Analytics</h1>
              <p className="text-gray-600 text-sm">Track your community performance</p>
            </div>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 border-gray-300"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Main Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {mainStats.map((stat, i) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.02, y: -3 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}><stat.icon className="w-5 h-5 text-white" /></div>
                    <Badge className={stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}{stat.change}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Performance Chart */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-500" />Weekly Performance</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-around gap-4 px-4">
                  {weeklyData.map((data, i) => (
                    <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        className="w-full bg-gradient-to-t from-purple-500 to-orange-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.value / maxValue) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                      <span className="text-sm text-gray-600">{data.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white border border-gray-200 shadow-lg h-full">
              <CardHeader><CardTitle className="flex items-center gap-2"><PieChart className="w-5 h-5 text-orange-500" />Traffic Sources</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {audienceData.map((item) => (
                  <div key={item.source} className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-700">{item.source}</span><span className="font-medium">{item.percentage}%</span></div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div className={`h-2 rounded-full ${item.color}`} initial={{ width: 0 }} animate={{ width: `${item.percentage}%` }} transition={{ delay: 0.6, duration: 0.5 }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Performing Events */}
        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-green-500" />Top Performing Events</CardTitle><CardDescription>Events generating the most engagement</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Event</th><th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Clicks</th><th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Conversions</th><th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Earnings</th></tr></thead>
                  <tbody>
                    {topEvents.map((event, i) => (
                      <motion.tr key={event.name} className="border-b border-gray-100 hover:bg-gray-50" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                        <td className="py-4 px-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5 text-white" /></div><span className="font-medium">{event.name}</span></div></td>
                        <td className="py-4 px-4 text-right text-gray-700">{event.clicks}</td>
                        <td className="py-4 px-4 text-right"><Badge className="bg-green-100 text-green-700">{event.conversions}</Badge></td>
                        <td className="py-4 px-4 text-right font-semibold text-green-600">{event.earnings}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Card */}
        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <Card className="bg-gradient-to-r from-purple-50 via-white to-orange-50 border border-purple-200">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0"><Sparkles className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Weekly Insights</h3>
                <p className="text-gray-600">Your engagement is up 12.5% compared to last week! Your Instagram posts are driving the most traffic. Consider posting more event teasers on weekends for maximum reach.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityAnalytics;
