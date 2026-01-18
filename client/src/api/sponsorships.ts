// Sponsorships API - Frontend wrapper for sponsorship-related API calls
import { apiClient } from './client';
import type { Event } from './events';

export interface Sponsorship {
    id: string;
    title: string;
    description: string | null;
    budget_min: number | null;
    budget_max: number | null;
    benefits: string[] | null;
    status: string | null;
    event_id: string | null;
    created_at: string | null;
    events?: Event;
}

export interface CreateSponsorshipData {
    title: string;
    description?: string;
    budget_min?: number;
    budget_max?: number;
    benefits?: string[];
    status?: string;
    event_id: string;
}

export const sponsorshipsApi = {
    // Get all open sponsorship opportunities (public)
    getAll: () => apiClient.get<Sponsorship[]>('/sponsorships'),

    // Get sponsorship by ID (public)
    getById: (id: string) => apiClient.get<Sponsorship>(`/sponsorships/${id}`),

    // Create sponsorship opportunity (requires auth - organizers only)
    create: (data: CreateSponsorshipData, token: string) =>
        apiClient.post<Sponsorship>('/sponsorships', data, token),

    // Update sponsorship (requires auth)
    update: (id: string, data: Partial<CreateSponsorshipData>, token: string) =>
        apiClient.put<Sponsorship>(`/sponsorships/${id}`, data, token),
};

export default sponsorshipsApi;
