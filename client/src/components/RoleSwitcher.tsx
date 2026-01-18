import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Users, Target, Globe, UserCircle, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Role {
  role: string;
  is_primary: boolean;
}

interface RoleSwitcherProps {
  currentRole: 'organizer' | 'sponsor' | 'community' | 'participant';
}

const roleConfig = {
  organizer: {
    label: 'Event Organizer',
    icon: Users,
    color: 'from-orange-500 to-pink-500',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    dashboard: '/organizer/dashboard'
  },
  sponsor: {
    label: 'Sponsor',
    icon: Target,
    color: 'from-pink-500 to-purple-500',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    dashboard: '/sponsor/dashboard'
  },
  community: {
    label: 'Community Partner',
    icon: Globe,
    color: 'from-purple-500 to-orange-500',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    dashboard: '/community/dashboard'
  },
  participant: {
    label: 'Participant',
    icon: UserCircle,
    color: 'from-orange-500 to-pink-500',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    dashboard: '/participant/dashboard'
  }
};

const RoleSwitcher = ({ currentRole }: RoleSwitcherProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) return;

      try {
        const { data } = await supabase
          .from('user_roles')
          .select('role, is_primary')
          .eq('user_id', user.id);

        if (data) {
          setRoles(data);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  const handleRoleSwitch = (role: string) => {
    const config = roleConfig[role as keyof typeof roleConfig];
    if (config && role !== currentRole) {
      navigate(config.dashboard);
    }
  };

  const currentConfig = roleConfig[currentRole];
  const CurrentIcon = currentConfig.icon;

  if (loading) {
    return (
      <div className="h-9 w-40 bg-gray-100 animate-pulse rounded-md"></div>
    );
  }

  // If user only has one role, just show a badge
  if (roles.length <= 1) {
    return (
      <Badge className={`${currentConfig.bgColor} ${currentConfig.textColor} border-none px-3 py-1.5`}>
        <CurrentIcon className="w-4 h-4 mr-2" />
        {currentConfig.label}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`border-gray-300 hover:bg-gray-50 gap-2`}
        >
          <div className={`w-6 h-6 bg-gradient-to-r ${currentConfig.color} rounded flex items-center justify-center`}>
            <CurrentIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="hidden sm:inline">{currentConfig.label}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-gray-500 font-normal">
          Switch Role
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((roleItem) => {
          const config = roleConfig[roleItem.role as keyof typeof roleConfig];
          if (!config) return null;
          
          const Icon = config.icon;
          const isActive = roleItem.role === currentRole;
          
          return (
            <DropdownMenuItem
              key={roleItem.role}
              onClick={() => handleRoleSwitch(roleItem.role)}
              className={`cursor-pointer ${isActive ? 'bg-gray-100' : ''}`}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center mr-3`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-black">{config.label}</p>
                {roleItem.is_primary && (
                  <p className="text-xs text-gray-500">Primary</p>
                )}
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              )}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate('/onboarding')}
          className="cursor-pointer text-gray-600"
        >
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <Settings className="w-4 h-4 text-gray-600" />
          </div>
          <span>Manage Roles</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
