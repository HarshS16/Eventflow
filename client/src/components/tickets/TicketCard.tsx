import { motion } from 'framer-motion';
import { Calendar, MapPin, QrCode, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Ticket } from '@/api/tickets';

interface TicketCardProps {
    ticket: Ticket;
    onClick: (ticket: Ticket) => void;
}

const statusConfig = {
    issued: {
        label: 'Valid',
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle2
    },
    used: {
        label: 'Used',
        color: 'bg-gray-100 text-gray-600 border-gray-300',
        icon: Clock
    },
    cancelled: {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle
    }
};

export default function TicketCard({ ticket, onClick }: TicketCardProps) {
    const event = ticket.events;
    const status = statusConfig[ticket.status] || statusConfig.issued;
    const StatusIcon = status.icon;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'TBA';
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            <Card 
                className="bg-white border border-gray-200 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                onClick={() => onClick(ticket)}
            >
                {/* Ticket header with gradient */}
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg truncate">
                                {event?.title || 'Event'}
                            </h3>
                            <p className="text-white/80 text-sm font-medium mt-1">
                                {ticket.participant_name}
                            </p>
                        </div>
                        <Badge className={`${status.color} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <div className="flex gap-4">
                        {/* QR Code Preview */}
                        <motion.div 
                            className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
                            whileHover={{ rotate: 5 }}
                        >
                            <QrCode className="w-12 h-12 text-gray-400" />
                        </motion.div>

                        {/* Event Details */}
                        <div className="flex-1 space-y-2">
                            {event?.event_date && (
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                                    {formatDate(event.event_date)}
                                </div>
                            )}
                            {event?.location && (
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Click hint */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-400 text-center">
                            Tap to view QR code
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
