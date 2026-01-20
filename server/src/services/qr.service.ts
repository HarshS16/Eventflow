import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

/**
 * QR Code Service
 * Handles generation of unique QR tokens and QR code images
 */

/**
 * Generate a cryptographically secure unique token for QR code
 * Format: uuid-timestamp-hash
 */
export function generateQRToken(): string {
    const uuid = uuidv4();
    const timestamp = Date.now().toString(36);
    const randomBytes = crypto.randomBytes(8).toString('hex');
    const hash = crypto
        .createHash('sha256')
        .update(`${uuid}-${timestamp}-${randomBytes}`)
        .digest('hex')
        .substring(0, 12);

    return `${uuid}-${hash}`;
}

/**
 * Generate QR code as base64 Data URL (for embedding in emails)
 * @param data - The data to encode in the QR code
 * @returns Base64 data URL string
 */
export async function generateQRCodeDataURL(data: string): Promise<string> {
    try {
        const dataUrl = await QRCode.toDataURL(data, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
        return dataUrl;
    } catch (error) {
        console.error('Error generating QR code data URL:', error);
        throw new Error('Failed to generate QR code');
    }
}

/**
 * Generate QR code as raw base64 string (for email attachments)
 * @param data - The data to encode in the QR code
 * @returns Base64 string without data URL prefix
 */
export async function generateQRCodeBase64(data: string): Promise<string> {
    try {
        const dataUrl = await generateQRCodeDataURL(data);
        // Remove the data URL prefix to get raw base64
        return dataUrl.replace(/^data:image\/png;base64,/, '');
    } catch (error) {
        console.error('Error generating QR code base64:', error);
        throw new Error('Failed to generate QR code');
    }
}

/**
 * Generate QR code as SVG string (for frontend display)
 * @param data - The data to encode in the QR code
 * @returns SVG string
 */
export async function generateQRCodeSVG(data: string): Promise<string> {
    try {
        const svg = await QRCode.toString(data, {
            type: 'svg',
            errorCorrectionLevel: 'M',
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
        return svg;
    } catch (error) {
        console.error('Error generating QR code SVG:', error);
        throw new Error('Failed to generate QR code');
    }
}

/**
 * Validate QR token format
 * @param token - The token to validate
 * @returns Boolean indicating if token format is valid
 */
export function isValidQRToken(token: string): boolean {
    // UUID (36 chars) + dash + hash (12 chars) = 49 chars
    const tokenRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{12}$/i;
    return tokenRegex.test(token);
}
