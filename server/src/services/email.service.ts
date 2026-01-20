import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { generateQRCodeDataURL, generateQRCodeBase64 } from './qr.service.js';

// Configuration
const getEnv = (key: string) => process.env[key];

// Transport types
type EmailTransport = 'resend' | 'nodemailer' | 'sendgrid';

function getActiveTransport(): EmailTransport {
    // SendGrid takes priority
    if (getEnv('SENDGRID_API_KEY')) {
        return 'sendgrid';
    }
    if (getEnv('SMTP_HOST') && getEnv('SMTP_USER') && getEnv('SMTP_PASS')) {
        return 'nodemailer';
    }
    if (getEnv('RESEND_API_KEY')) {
        return 'resend';
    }
    throw new Error('No email transport configured. Set SENDGRID_API_KEY, SMTP_* vars, or RESEND_API_KEY in .env');
}

// Lazy initialize clients
let resendInstance: Resend | null = null;
let nodemailerTransporter: nodemailer.Transporter | null = null;
let sendgridInitialized = false;

function getResend(): Resend {
    if (!resendInstance) {
        const apiKey = getEnv('RESEND_API_KEY');
        if (!apiKey) throw new Error('RESEND_API_KEY missing');
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
}

function getNodemailer(): nodemailer.Transporter {
    if (!nodemailerTransporter) {
        nodemailerTransporter = nodemailer.createTransport({
            host: getEnv('SMTP_HOST'),
            port: parseInt(getEnv('SMTP_PORT') || '465'),
            secure: getEnv('SMTP_SECURE') === 'true' || true,
            auth: {
                user: getEnv('SMTP_USER'),
                pass: getEnv('SMTP_PASS'),
            },
        });
    }
    return nodemailerTransporter;
}

// SendGrid initialization - matches official SDK pattern
function initSendGrid() {
    if (!sendgridInitialized) {
        const apiKey = getEnv('SENDGRID_API_KEY');
        if (!apiKey) throw new Error('SENDGRID_API_KEY missing');
        sgMail.setApiKey(apiKey);
        sendgridInitialized = true;
    }
    return sgMail;
}

// Email sender address
const getFromEmail = () => process.env.FROM_EMAIL || 'tickets@eventflow.app';
const getFromName = () => process.env.FROM_NAME || 'Eventflow';

interface TicketEmailData {
    recipientEmail: string;
    recipientName: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    qrCodeData: string;
    ticketId: string;
}

/**
 * Generate HTML email template for ticket
 * @param data - Ticket data
 * @param qrCodeSrc - Either a data URL or 'cid:qrcode' for inline attachment
 */
function generateTicketEmailHTML(data: TicketEmailData, qrCodeSrc: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Event Ticket</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎫 Your Event Ticket</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px;">
                            <!-- Greeting -->
                            <p style="margin: 0 0 24px; color: #333333; font-size: 18px;">
                                Hi <strong>${data.recipientName}</strong>,
                            </p>
                            <p style="margin: 0 0 32px; color: #666666; font-size: 16px; line-height: 1.6;">
                                Your ticket for the event has been issued! Present the QR code below at the venue for check-in.
                            </p>
                            
                            <!-- Event Details Card -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 12px; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 22px; font-weight: 700;">${data.eventTitle}</h2>
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 100px;">📅 Date</td>
                                                <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${data.eventDate}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px;">📍 Location</td>
                                                <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${data.eventLocation}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px;">👤 Attendee</td>
                                                <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${data.recipientName}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- QR Code -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 24px; background-color: #ffffff; border: 2px dashed #e5e5e5; border-radius: 12px;">
                                        <p style="margin: 0 0 16px; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Scan for Entry</p>
                                        <img src="${qrCodeSrc}" alt="Event Ticket QR Code" style="width: 200px; height: 200px; display: block; margin: 0 auto 16px;" />
                                        <p style="margin: 0; color: #999999; font-size: 12px; font-family: monospace;">Ticket ID: ${data.ticketId.substring(0, 8)}...</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Instructions -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 32px;">
                                <tr>
                                    <td style="padding: 16px; background-color: #fef3c7; border-radius: 8px;">
                                        <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                            💡 <strong>Tip:</strong> Save this email or take a screenshot of the QR code. You can also view your ticket anytime on your Eventflow dashboard.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #fafafa; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 8px; color: #999999; font-size: 12px;">
                                This ticket was sent by Eventflow
                            </p>
                            <p style="margin: 0; color: #cccccc; font-size: 11px;">
                                © ${new Date().getFullYear()} Eventflow. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

/**
 * Send a single ticket email
 */
export async function sendTicketEmail(ticketData: TicketEmailData): Promise<{ success: boolean; error?: string }> {
    try {
        const transport = getActiveTransport();
        const subject = `🎫 Your Ticket for ${ticketData.eventTitle}`;
        const from = `${getFromName()} <${getFromEmail()}>`;

        if (transport === 'sendgrid') {
            // SendGrid - use CID attachment for inline image
            const sg = initSendGrid();
            const qrBase64 = await generateQRCodeBase64(ticketData.qrCodeData);
            const htmlContent = generateTicketEmailHTML(ticketData, 'cid:qrcode');

            await sg.send({
                to: ticketData.recipientEmail,
                from: { email: getFromEmail(), name: getFromName() },
                subject,
                html: htmlContent,
                attachments: [
                    {
                        content: qrBase64,
                        filename: 'qrcode.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'qrcode'  // SendGrid API expects snake_case
                    } as any
                ]
            });
            console.log(`Ticket email sent (SendGrid) to ${ticketData.recipientEmail}`);
        } else if (transport === 'resend') {
            const qrCodeDataUrl = await generateQRCodeDataURL(ticketData.qrCodeData);
            const htmlContent = generateTicketEmailHTML(ticketData, qrCodeDataUrl);

            const { data, error } = await getResend().emails.send({
                from,
                to: ticketData.recipientEmail,
                subject,
                html: htmlContent
            });

            if (error) {
                console.error('Resend error:', error);
                return { success: false, error: error.message };
            }
            console.log(`Ticket email sent (Resend) to ${ticketData.recipientEmail}, ID: ${data?.id}`);
        } else {
            // Nodemailer - use CID attachment
            const qrBase64 = await generateQRCodeBase64(ticketData.qrCodeData);
            const htmlContent = generateTicketEmailHTML(ticketData, 'cid:qrcode');

            const info = await getNodemailer().sendMail({
                from,
                to: ticketData.recipientEmail,
                subject,
                html: htmlContent,
                attachments: [
                    {
                        filename: 'qrcode.png',
                        content: Buffer.from(qrBase64, 'base64'),
                        cid: 'qrcode'
                    }
                ]
            });
            console.log(`Ticket email sent (SMTP) to ${ticketData.recipientEmail}, ID: ${info.messageId}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error sending ticket email:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

/**
 * Send multiple ticket emails in batch
 */
export async function sendBulkTicketEmails(ticketsData: TicketEmailData[]): Promise<{
    successful: number;
    failed: number;
    errors: Array<{ email: string; error: string }>;
}> {
    const results = {
        successful: 0,
        failed: 0,
        errors: [] as Array<{ email: string; error: string }>
    };

    if (ticketsData.length === 0) return results;

    try {
        const transport = getActiveTransport();

        // Prepare payloads
        const emailPayloads = await Promise.all(ticketsData.map(async (ticketData) => {
            try {
                // For SendGrid and Nodemailer, we use base64 for CID attachment
                // For Resend, we use data URL
                const qrBase64 = await generateQRCodeBase64(ticketData.qrCodeData);
                const qrDataUrl = `data:image/png;base64,${qrBase64}`;

                return {
                    from: `${getFromName()} <${getFromEmail()}>`,
                    to: ticketData.recipientEmail,
                    subject: `🎫 Your Ticket for ${ticketData.eventTitle}`,
                    htmlCid: generateTicketEmailHTML(ticketData, 'cid:qrcode'),
                    htmlDataUrl: generateTicketEmailHTML(ticketData, qrDataUrl),
                    qrBase64,
                    _ticketEmail: ticketData.recipientEmail
                };
            } catch (err) {
                results.failed++;
                results.errors.push({
                    email: ticketData.recipientEmail,
                    error: err instanceof Error ? err.message : 'Failed to generate QR code'
                });
                return null;
            }
        }));

        const validPayloads = emailPayloads.filter((p): p is NonNullable<typeof p> => p !== null);
        if (validPayloads.length === 0) return results;

        if (transport === 'sendgrid') {
            // Use SendGrid with CID attachments
            const sg = initSendGrid();
            for (const payload of validPayloads) {
                try {
                    await sg.send({
                        to: payload.to,
                        from: { email: getFromEmail(), name: getFromName() },
                        subject: payload.subject,
                        html: payload.htmlCid,
                        attachments: [
                            {
                                content: payload.qrBase64,
                                filename: 'qrcode.png',
                                type: 'image/png',
                                disposition: 'inline',
                                content_id: 'qrcode'  // SendGrid API expects snake_case
                            } as any
                        ]
                    });
                    results.successful++;
                    console.log(`Ticket email sent (SendGrid) to ${payload._ticketEmail}`);
                } catch (err: any) {
                    console.error(`Failed to send to ${payload._ticketEmail}:`, err.response?.body || err);
                    results.failed++;
                    results.errors.push({
                        email: payload._ticketEmail,
                        error: err.message || 'SendGrid send failed'
                    });
                }
            }
        } else if (transport === 'resend') {
            // Use Resend Batch API
            const BATCH_LIMIT = 100;
            for (let i = 0; i < validPayloads.length; i += BATCH_LIMIT) {
                const batch = validPayloads.slice(i, i + BATCH_LIMIT);
                // Resend uses data URLs - extract only the needed fields
                const cleanedBatch = batch.map(p => ({
                    from: p.from,
                    to: [p.to],
                    subject: p.subject,
                    html: p.htmlDataUrl
                }));

                try {
                    const { data, error } = await getResend().batch.send(cleanedBatch);
                    if (error) throw new Error(error.message);

                    if (data && Array.isArray(data.data)) {
                        data.data.forEach((result: { id?: string }, index: number) => {
                            if (result.id) results.successful++;
                            else {
                                results.failed++;
                                results.errors.push({ email: batch[index]._ticketEmail, error: 'No ID returned' });
                            }
                        });
                    } else {
                        results.successful += batch.length;
                    }
                } catch (batchError) {
                    batch.forEach(p => {
                        results.failed++;
                        results.errors.push({ email: p._ticketEmail, error: batchError instanceof Error ? batchError.message : 'Batch failed' });
                    });
                }

                if (i + BATCH_LIMIT < validPayloads.length) await new Promise(r => setTimeout(r, 200));
            }
        } else {
            // Use Nodemailer with CID attachments
            for (const payload of validPayloads) {
                try {
                    await getNodemailer().sendMail({
                        from: payload.from,
                        to: payload.to,
                        subject: payload.subject,
                        html: payload.htmlCid,
                        attachments: [
                            {
                                filename: 'qrcode.png',
                                content: Buffer.from(payload.qrBase64, 'base64'),
                                cid: 'qrcode'
                            }
                        ]
                    });
                    results.successful++;
                    console.log(`Ticket email sent (SMTP) to ${payload._ticketEmail}`);
                } catch (err) {
                    console.error(`Failed to send to ${payload._ticketEmail}:`, err);
                    results.failed++;
                    results.errors.push({
                        email: payload._ticketEmail,
                        error: err instanceof Error ? err.message : 'SMTP send failed'
                    });
                }
                // Small delay to be nice to SMTP servers
                await new Promise(r => setTimeout(r, 500));
            }
        }

    } catch (error) {
        console.error('Error in bulk email send:', error);
        // Fallback for catastrophic error
        const remaining = ticketsData.length - (results.successful + results.failed);
        if (remaining > 0) {
            results.failed += remaining;
            results.errors.push({ email: 'multiple', error: 'Service configuration error' });
        }
    }

    return results;
}

/**
 * Format date for email display
 */
export function formatEventDate(dateString: string | null): string {
    if (!dateString) return 'TBA';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
}
