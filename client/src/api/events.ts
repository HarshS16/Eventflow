// Events API - Frontend wrapper for event-related API calls
import { apiClient } from './client';

export interface Event {
    id: string;
    title: string;
    description: string | null;
    event_date: string | null;
    location: string | null;
    max_attendees: number | null;
    ticket_price: number | null;
    status: string | null;
    organizer_id: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface CreateEventData {
    title: string;
    description?: string;
    event_date?: string;
    location?: string;
    max_attendees?: number;
    ticket_price?: number;
    status?: string;
}

export const eventsApi = {
    // Get all published events (public)
    getAll: () => apiClient.get<Event[]>('/events'),

    // Get single event by ID (public)
    getById: (id: string) => apiClient.get<Event>(`/events/${id}`),

    // Get events for an organizer (requires auth)
    getByOrganizer: (organizerId: string, token: string) =>
        apiClient.get<Event[]>(`/events/organizer/${organizerId}`, token),

    // Create new event (requires auth)
    create: (data: CreateEventData, token: string) =>
        apiClient.post<Event>('/events', data, token),

    // Update event (requires auth)
    update: (id: string, data: Partial<CreateEventData>, token: string) =>
        apiClient.put<Event>(`/events/${id}`, data, token),

    // Delete event (requires auth)
    delete: (id: string, token: string) =>
        apiClient.delete(`/events/${id}`, token),
};

export default eventsApi;
