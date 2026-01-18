import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingRoles, setCheckingRoles] = useState(true);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);

  useEffect(() => {
    const checkUserRoles = async () => {
      if (!user) {
        setCheckingRoles(false);
        return;
      }

      try {
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        // If table doesn't exist or query errors, redirect to onboarding
        if (error) {
          console.log('Error querying roles, redirecting to onboarding:', error.message);
          navigate('/onboarding', { replace: true });
          return;
        }

        if (!roles || roles.length === 0) {
          // No roles, redirect to onboarding
          navigate('/onboarding', { replace: true });
          return;
        }

        // Check if user has the required role (if specified)
        if (requiredRole) {
          const hasRole = roles.some(r => r.role === requiredRole);
          setHasRequiredRole(hasRole);
          
          if (!hasRole) {
            // Redirect to their primary dashboard
            const primaryRole = roles[0].role;
            navigate(`/${primaryRole}/dashboard`, { replace: true });
            return;
          }
        } else {
          setHasRequiredRole(true);
        }
      } catch (error) {
        console.error('Error checking roles:', error);
        // If anything fails, redirect to onboarding
        navigate('/onboarding', { replace: true });
      } finally {
        setCheckingRoles(false);
      }
    };

    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true, state: { from: location } });
      } else {
        checkUserRoles();
      }
    }
  }, [user, loading, navigate, requiredRole, location]);

  if (loading || checkingRoles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user || !hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
