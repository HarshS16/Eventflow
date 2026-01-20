import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2, CheckCircle2, AlertCircle, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { issueBulkTickets, type BulkIssueResponse } from '@/api/tickets';
import { useToast } from '@/hooks/use-toast';

interface IssueTicketsModalProps {
    eventId: string;
    eventTitle: string;
    approvedCount: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

type ModalState = 'confirm' | 'loading' | 'success' | 'error';

export default function IssueTicketsModal({
    eventId,
    eventTitle,
    approvedCount,
    isOpen,
    onClose,
    onSuccess
}: IssueTicketsModalProps) {
    const [state, setState] = useState<ModalState>('confirm');
    const [result, setResult] = useState<BulkIssueResponse | null>(null);
    const [error, setError] = useState<string>('');
    const { toast } = useToast();

    const handleIssueTickets = async () => {
        try {
            setState('loading');
            const response = await issueBulkTickets(eventId);
            setResult(response);
            setState('success');
            toast({
                title: 'Tickets Issued',
                description: `${response.ticketsCreated} tickets issued, ${response.emailsSent} emails sent`,
            });
            onSuccess();
        } catch (err: any) {
            console.error('Error issuing tickets:', err);
            setError(err.response?.data?.error || err.message || 'Failed to issue tickets');
            setState('error');
        }
    };

    const handleClose = () => {
        setState('confirm');
        setResult(null);
        setError('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-5 text-white">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20"
                                onClick={handleClose}
                                disabled={state === 'loading'}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Ticket className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Issue QR Tickets</h2>
                                    <p className="text-white/80 text-sm truncate max-w-[250px]">{eventTitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Confirm State */}
                            {state === 'confirm' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-8 h-8 text-orange-500" />
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {approvedCount} Approved Participants
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Will receive QR tickets via email
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        This will generate unique QR codes for each approved participant and send them via email. 
                                        Participants can also view their tickets in their dashboard.
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                                            onClick={handleIssueTickets}
                                        >
                                            <Ticket className="w-4 h-4 mr-2" />
                                            Issue Tickets
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Loading State */}
                            {state === 'loading' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-8 text-center"
                                >
                                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                                    <p className="font-medium text-gray-900">Issuing Tickets...</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Generating QR codes and sending emails
                                    </p>
                                </motion.div>
                            )}

                            {/* Success State */}
                            {state === 'success' && result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, type: 'spring' }}
                                        className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </motion.div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Tickets Issued Successfully!
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {result.message}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 py-2">
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-2xl font-bold text-gray-900">{result.ticketsCreated}</p>
                                            <p className="text-xs text-gray-500">Tickets Created</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-2xl font-bold text-green-600">{result.emailsSent}</p>
                                            <p className="text-xs text-gray-500">Emails Sent</p>
                                        </div>
                                    </div>

                                    {result.emailsFailed > 0 && (
                                        <div className="p-3 bg-yellow-50 rounded-lg text-left">
                                            <p className="text-sm text-yellow-700">
                                                ⚠️ {result.emailsFailed} emails failed to send
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500"
                                        onClick={handleClose}
                                    >
                                        Done
                                    </Button>
                                </motion.div>
                            )}

                            {/* Error State */}
                            {state === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-4"
                                >
                                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-8 h-8 text-red-600" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Failed to Issue Tickets
                                        </h3>
                                        <p className="text-sm text-red-600 mt-1">
                                            {error}
                                        </p>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            onClick={() => setState('confirm')}
                                        >
                                            Try Again
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
