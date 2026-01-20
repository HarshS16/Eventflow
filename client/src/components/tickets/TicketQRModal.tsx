import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User, CheckCircle2, Clock, XCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import type { Ticket } from '@/api/tickets';

interface TicketQRModalProps {
    ticket: Ticket | null;
    isOpen: boolean;
    onClose: () => void;
}

const statusConfig = {
    issued: {
        label: 'Valid Ticket',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: CheckCircle2
    },
    used: {
        label: 'Already Used',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        icon: Clock
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: XCircle
    }
};

export default function TicketQRModal({ ticket, isOpen, onClose }: TicketQRModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!ticket) return null;

    const event = ticket.events;
    const status = statusConfig[ticket.status] || statusConfig.issued;
    const StatusIcon = status.icon;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'TBA';
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20"
                                onClick={onClose}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            
                            <h2 className="text-2xl font-bold pr-8">
                                {event?.title || 'Event Ticket'}
                            </h2>
                            
                            <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full ${status.bgColor} ${status.color}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span className="font-medium text-sm">{status.label}</span>
                            </div>
                        </div>

                        {/* Participant Name */}
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Attendee</p>
                                    <p className="font-semibold text-gray-900">{ticket.participant_name}</p>
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="p-8 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="p-4 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200"
                            >
                                <QRCode
                                    value={ticket.qr_code_data}
                                    size={200}
                                    level="M"
                                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                />
                            </motion.div>
                            
                            <p className="mt-4 text-xs text-gray-400 font-mono">
                                ID: {ticket.id.substring(0, 8)}...
                            </p>
                        </div>

                        {/* Event Details */}
                        <div className="px-6 pb-6 space-y-3">
                            {event?.event_date && (
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <span className="text-gray-600">{formatDate(event.event_date)}</span>
                                </div>
                            )}
                            {event?.location && (
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-pink-600" />
                                    </div>
                                    <span className="text-gray-600">{event.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                            <p className="text-xs text-gray-500 text-center">
                                Present this QR code at the venue for check-in
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
