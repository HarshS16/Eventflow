import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.js';

let supabaseInstance: SupabaseClient<Database> | null = null;

function getEnvVar(name: string, fallback?: string): string {
    const value = process.env[name] || fallback;
    if (!value) {
        console.error(`❌ ${name} is not set`);
    }
    return value || '';
}

// Lazy initialization of Supabase client
export function getSupabase(): SupabaseClient<Database> {
    if (!supabaseInstance) {
        const SUPABASE_URL = getEnvVar('SUPABASE_URL', process.env.VITE_SUPABASE_URL);
        const SUPABASE_SERVICE_KEY = getEnvVar('SUPABASE_SERVICE_ROLE_KEY', process.env.VITE_SUPABASE_ANON_KEY);

        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            throw new Error('Supabase configuration is missing. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
        }

        supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });
    }
    return supabaseInstance;
}

// For backwards compatibility - export as getter
export const supabase = {
    get client() {
        return getSupabase();
    },
    from(table: string) {
        return getSupabase().from(table as any);
    },
    auth: {
        getUser(token: string) {
            return getSupabase().auth.getUser(token);
        }
    }
};

// Create a client for authenticated requests (when verifying user tokens)
export const createAuthClient = (accessToken: string) => {
    const SUPABASE_URL = getEnvVar('SUPABASE_URL', process.env.VITE_SUPABASE_URL);
    const SUPABASE_SERVICE_KEY = getEnvVar('SUPABASE_SERVICE_ROLE_KEY', process.env.VITE_SUPABASE_ANON_KEY);

    return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    });
};
