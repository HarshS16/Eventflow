// Profiles API - Frontend wrapper for profile-related API calls
import { apiClient } from './client';

export interface Profile {
    id: string;
    email: string | null;
    full_name: string | null;
    company_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    website: string | null;
    user_type: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface UpdateProfileData {
    full_name?: string;
    company_name?: string;
    bio?: string;
    avatar_url?: string;
    website?: string;
}

export const profilesApi = {
    // Get current user's profile
    getMe: (token: string) => apiClient.get<Profile>('/profiles/me', token),

    // Get profile by ID (requires auth)
    getById: (id: string, token: string) =>
        apiClient.get<Profile>(`/profiles/${id}`, token),

    // Update profile (requires auth)
    update: (id: string, data: UpdateProfileData, token: string) =>
        apiClient.put<Profile>(`/profiles/${id}`, data, token),
};

export default profilesApi;
