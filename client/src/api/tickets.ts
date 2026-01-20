import { supabase } from '@/integrations/supabase/client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper to get auth token
async function getAuthToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
}

// Helper for authenticated requests
async function authFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = await getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        const err = new Error(error.error || `HTTP ${response.status}`);
        (err as any).response = { data: error };
        throw err;
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

// Types
export interface Ticket {
    id: string;
    registration_id: string;
    event_id: string;
    participant_email: string;
    participant_name: string;
    qr_code_data: string;
    qr_issued_at: string;
    qr_used_at: string | null;
    status: 'issued' | 'used' | 'cancelled';
    created_at: string;
    events?: {
        id: string;
        title: string;
        event_date: string | null;
        location: string | null;
        status: string;
    };
}

export interface BulkIssueResponse {
    message: string;
    ticketsCreated: number;
    emailsSent: number;
    emailsFailed: number;
    errors?: Array<{ email: string; error: string }>;
}

export interface SingleIssueResponse {
    message: string;
    ticket: Ticket;
    emailSent: boolean;
    emailError?: string;
}

export interface EventTicketsResponse {
    tickets: Ticket[];
    stats: {
        total: number;
        issued: number;
        used: number;
        cancelled: number;
    };
}

export interface ValidateResponse {
    valid: boolean;
    message: string;
    reason?: 'not_found' | 'already_used' | 'cancelled' | 'wrong_event';
    participant?: {
        name: string;
        email: string;
    };
    event?: {
        id: string;
        title: string;
    };
    checkedInAt?: string;
    usedAt?: string;
}

// Issue tickets to all approved participants for an event (bulk)
export async function issueBulkTickets(eventId: string): Promise<BulkIssueResponse> {
    return authFetch<BulkIssueResponse>(`/tickets/issue-bulk/${eventId}`, {
        method: 'POST',
    });
}

// Issue ticket to a single registration
export async function issueSingleTicket(registrationId: string): Promise<SingleIssueResponse> {
    return authFetch<SingleIssueResponse>(`/tickets/issue/${registrationId}`, {
        method: 'POST',
    });
}

// Get current user's tickets (for participants)
export async function getMyTickets(): Promise<Ticket[]> {
    return authFetch<Ticket[]>('/tickets/my-tickets');
}

// Get all tickets for an event (for organizers)
export async function getEventTickets(eventId: string): Promise<EventTicketsResponse> {
    return authFetch<EventTicketsResponse>(`/tickets/event/${eventId}`);
}

// Validate QR code at event check-in
export async function validateTicket(qrCodeData: string, eventId?: string): Promise<ValidateResponse> {
    return authFetch<ValidateResponse>('/tickets/validate', {
        method: 'POST',
        body: JSON.stringify({ qrCodeData, eventId }),
    });
}

// Cancel a ticket
export async function cancelTicket(ticketId: string): Promise<{ message: string }> {
    return authFetch<{ message: string }>(`/tickets/cancel/${ticketId}`, {
        method: 'PATCH',
    });
}

