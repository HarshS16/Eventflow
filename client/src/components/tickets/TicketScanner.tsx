import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, QrCode, CheckCircle2, XCircle, AlertTriangle, Loader2, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateTicket, type ValidateResponse } from '@/api/tickets';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

interface TicketScannerProps {
    eventId: string;
    eventTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

type ScanState = 'scanning' | 'validating' | 'success' | 'error' | 'manual';

export default function TicketScanner({ eventId, eventTitle, isOpen, onClose }: TicketScannerProps) {
    const [state, setState] = useState<ScanState>('scanning');
    const [result, setResult] = useState<ValidateResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [manualCode, setManualCode] = useState('');
    const [cameraError, setCameraError] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const readerRef = useRef<BrowserMultiFormatReader | null>(null);

    const stopScanning = useCallback(() => {
        if (readerRef.current) {
            readerRef.current.reset();
            readerRef.current = null;
        }
    }, []);

    const handleValidate = async (qrCodeData: string) => {
        if (!qrCodeData.trim()) return;
        
        try {
            setState('validating');
            stopScanning();
            
            const response = await validateTicket(qrCodeData, eventId);
            setResult(response);
            setState(response.valid ? 'success' : 'error');
        } catch (err: any) {
            console.error('Validation error:', err);
            const errorData = err.response?.data;
            if (errorData?.reason) {
                setResult(errorData);
                setState('error');
            } else {
                setError(err.response?.data?.error || err.message || 'Validation failed');
                setState('error');
            }
        }
    };

    const startScanning = useCallback(async () => {
        if (!videoRef.current || state !== 'scanning') return;
        
        try {
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
            
            const reader = new BrowserMultiFormatReader(hints);
            readerRef.current = reader;
            
            await reader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
                if (result) {
                    const qrData = result.getText();
                    handleValidate(qrData);
                }
                if (error && error.name !== 'NotFoundException') {
                    console.error('Scan error:', error);
                }
            });
            
            setCameraError(null);
        } catch (err: any) {
            console.error('Camera error:', err);
            setCameraError('Unable to access camera. Please check permissions or use manual entry.');
        }
    }, [state, eventId]);

    useEffect(() => {
        if (isOpen && state === 'scanning') {
            const timer = setTimeout(startScanning, 500);
            return () => {
                clearTimeout(timer);
                stopScanning();
            };
        }
        return () => stopScanning();
    }, [isOpen, state, startScanning, stopScanning]);

    const handleClose = () => {
        stopScanning();
        setState('scanning');
        setResult(null);
        setError('');
        setManualCode('');
        setCameraError(null);
        onClose();
    };

    const handleScanAnother = () => {
        setState('scanning');
        setResult(null);
        setError('');
        setManualCode('');
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualCode.trim()) {
            handleValidate(manualCode.trim());
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-5 text-white">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20"
                                onClick={handleClose}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <QrCode className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Check-in Scanner</h2>
                                    <p className="text-white/80 text-sm truncate max-w-[280px]">{eventTitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Scanning State */}
                            {state === 'scanning' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    {/* Camera View */}
                                    <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden">
                                        {cameraError ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                <Camera className="w-12 h-12 text-gray-400 mb-3" />
                                                <p className="text-gray-300 text-sm">{cameraError}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <video
                                                    ref={videoRef}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    playsInline
                                                    muted
                                                />
                                                {/* Scan overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.05, 1],
                                                            opacity: [0.5, 0.8, 0.5]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="w-48 h-48 border-4 border-white rounded-2xl"
                                                    />
                                                </div>
                                                {/* Scanning indicator */}
                                                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                                    <div className="px-4 py-2 bg-black/50 rounded-full flex items-center gap-2">
                                                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                                                        <span className="text-white text-sm">Scanning...</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Manual Entry Toggle */}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setState('manual')}
                                    >
                                        <Keyboard className="w-4 h-4 mr-2" />
                                        Enter Code Manually
                                    </Button>
                                </motion.div>
                            )}

                            {/* Manual Entry State */}
                            {state === 'manual' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <form onSubmit={handleManualSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Enter Ticket Code
                                            </label>
                                            <Input
                                                value={manualCode}
                                                onChange={(e) => setManualCode(e.target.value)}
                                                placeholder="Paste or type the QR code data"
                                                className="font-mono text-sm"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={() => setState('scanning')}
                                            >
                                                <Camera className="w-4 h-4 mr-2" />
                                                Use Camera
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500"
                                                disabled={!manualCode.trim()}
                                            >
                                                Validate
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Validating State */}
                            {state === 'validating' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 text-center"
                                >
                                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                                    <p className="font-medium text-gray-900">Validating Ticket...</p>
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
                                        transition={{ type: 'spring', damping: 15 }}
                                        className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </motion.div>

                                    <div>
                                        <h3 className="text-xl font-bold text-green-600">
                                            Check-in Successful!
                                        </h3>
                                    </div>

                                    {result.participant && (
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {result.participant.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {result.participant.email}
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500"
                                        onClick={handleScanAnother}
                                    >
                                        <QrCode className="w-4 h-4 mr-2" />
                                        Scan Another
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
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                                        result?.reason === 'already_used' ? 'bg-yellow-100' : 'bg-red-100'
                                    }`}>
                                        {result?.reason === 'already_used' ? (
                                            <AlertTriangle className="w-10 h-10 text-yellow-600" />
                                        ) : (
                                            <XCircle className="w-10 h-10 text-red-600" />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className={`text-xl font-bold ${
                                            result?.reason === 'already_used' ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {result?.reason === 'already_used' ? 'Already Checked In' : 'Invalid Ticket'}
                                        </h3>
                                        <p className="text-gray-500 mt-1">
                                            {result?.message || error}
                                        </p>
                                    </div>

                                    {result?.participant && (
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-semibold text-gray-900">
                                                {result.participant.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {result.participant.email}
                                            </p>
                                            {result.usedAt && (
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Checked in: {new Date(result.usedAt).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500"
                                        onClick={handleScanAnother}
                                    >
                                        <QrCode className="w-4 h-4 mr-2" />
                                        Scan Another
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
