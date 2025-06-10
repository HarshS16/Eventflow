
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import Layout from '@/components/layout/Layout';

const EventPage = () => {
  const { eventId } = useParams();
  const { toast } = useToast();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Error",
          description: "Event not found or not published",
          variant: "destructive"
        });
      } else {
        setEvent(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <motion.div 
            className="text-gray-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading event...
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Card className="bg-white border border-gray-200 shadow-lg max-w-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-black mb-2">Event Not Found</h3>
              <p className="text-gray-600">This event doesn't exist or is not published.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                    Live Event
                  </Badge>
                  <CardTitle className="text-3xl bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-4">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    {event.description}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.event_date && (
                    <motion.div 
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Calendar className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="font-medium text-black">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(event.event_date).toLocaleDateString()} at{' '}
                          {new Date(event.event_date).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {event.location && (
                    <motion.div 
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <MapPin className="w-6 h-6 text-pink-500" />
                      <div>
                        <p className="font-medium text-black">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </motion.div>
                  )}

                  {event.max_attendees && (
                    <motion.div 
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Users className="w-6 h-6 text-purple-500" />
                      <div>
                        <p className="font-medium text-black">Max Attendees</p>
                        <p className="text-gray-600">{event.max_attendees} people</p>
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <DollarSign className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium text-black">Ticket Price</p>
                      <p className="text-gray-600">
                        {event.ticket_price > 0 ? `$${event.ticket_price}` : 'Free'}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setShowRegistrationForm(true)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 text-lg shadow-lg shadow-orange-500/25"
                    >
                      Register for Event
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <EventRegistrationForm
          eventId={event.id}
          eventTitle={event.title}
          isOpen={showRegistrationForm}
          onClose={() => setShowRegistrationForm(false)}
        />
      </div>
    </Layout>
  );
};

export default EventPage;
