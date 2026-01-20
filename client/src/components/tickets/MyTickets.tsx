import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket as TicketIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMyTickets, type Ticket } from '@/api/tickets';
import TicketCard from './TicketCard';
import TicketQRModal from './TicketQRModal';

export default function MyTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMyTickets();
            setTickets(data);
        } catch (err) {
            console.error('Error fetching tickets:', err);
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleTicketClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTicket(null);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        My Tickets
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-48 bg-gray-100 rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        My Tickets
                    </h2>
                    <Button variant="outline" size="sm" onClick={fetchTickets}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </div>
                <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (tickets.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    My Tickets
                </h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full flex items-center justify-center"
                    >
                        <TicketIcon className="w-10 h-10 text-orange-500" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Tickets Yet
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Once you register for an event and receive a ticket, it will appear here.
                    </p>
                </motion.div>
            </div>
        );
    }

    // Tickets list
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    My Tickets ({tickets.length})
                </h2>
                <Button variant="outline" size="sm" onClick={fetchTickets}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                </Button>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {tickets.map((ticket) => (
                    <motion.div key={ticket.id} variants={itemVariants}>
                        <TicketCard ticket={ticket} onClick={handleTicketClick} />
                    </motion.div>
                ))}
            </motion.div>

            {/* QR Modal */}
            <TicketQRModal
                ticket={selectedTicket}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
