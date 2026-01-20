
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, CheckCircle, XCircle, Clock, Ticket, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { issueSingleTicket } from '@/api/tickets';

interface EventRegistrationsProps {
  eventId: string;
  eventTitle: string;
}

const EventRegistrations = ({ eventId, eventTitle }: EventRegistrationsProps) => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [issuingTicket, setIssuingTicket] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
    fetchTickets();
  }, [eventId]);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
      } else {
        setRegistrations(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('event_tickets')
        .select('*')
        .eq('event_id', eventId);

      if (!error && data) {
        const ticketMap: Record<string, any> = {};
        data.forEach((ticket: any) => {
          ticketMap[ticket.registration_id] = ticket;
        });
        setTickets(ticketMap);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleIssueTicket = async (registrationId: string) => {
    try {
      setIssuingTicket(registrationId);
      const result = await issueSingleTicket(registrationId);
      
      toast({
        title: "Ticket Issued",
        description: result.emailSent 
          ? "Ticket sent to participant via email" 
          : "Ticket created but email failed to send",
      });

      fetchTickets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to issue ticket",
        variant: "destructive"
      });
    } finally {
      setIssuingTicket(null);
    }
  };

  const getTicketStatus = (registrationId: string) => {
    const ticket = tickets[registrationId];
    if (!ticket) return null;
    
    switch (ticket.status) {
      case 'issued':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Ticket Issued</Badge>;
      case 'used':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Checked In</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const updateRegistrationStatus = async (registrationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ status })
        .eq('id', registrationId);

      if (error) {
        console.error('Error updating status:', error);
        throw error;
      }

      toast({
        title: "Status Updated",
        description: `Registration ${status} successfully`,
      });

      fetchRegistrations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-700 border-orange-300">Waitlist</Badge>;
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="text-center py-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-gray-600">Loading registrations...</div>
      </motion.div>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" />
          Registrations for {eventTitle}
          <Badge className="bg-gray-100 text-gray-700">{registrations.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {registrations.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No registrations yet</h3>
            <p className="text-gray-600">Share your event link to get registrations</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.full_name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone || '-'}</TableCell>
                    <TableCell>{registration.company || '-'}</TableCell>
                    <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    <TableCell>
                      {registration.status === 'approved' ? (
                        tickets[registration.id] ? (
                          getTicketStatus(registration.id)
                        ) : (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              onClick={() => handleIssueTicket(registration.id)}
                              disabled={issuingTicket === registration.id}
                              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs"
                            >
                              {issuingTicket === registration.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <>
                                  <Ticket className="w-3 h-3 mr-1" />
                                  Issue
                                </>
                              )}
                            </Button>
                          </motion.div>
                        )
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {registration.status !== 'approved' && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                              className="border-green-300 text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        )}
                        {registration.status !== 'rejected' && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRegistrations;
