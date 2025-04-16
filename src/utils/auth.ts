
import { create } from 'zustand';

export type UserTier = 'Free' | 'Lite' | 'Pro';

interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  trialEndsAt?: Date | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToTier: (tier: UserTier) => void;
  startFreeTrial: () => void;
}

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Free User',
    email: 'free@example.com',
    password: 'password',
    tier: 'Free' as UserTier,
  },
  {
    id: '2',
    name: 'Lite User',
    email: 'lite@example.com',
    password: 'password',
    tier: 'Lite' as UserTier,
  },
  {
    id: '3',
    name: 'Pro User',
    email: 'pro@example.com',
    password: 'password',
    tier: 'Pro' as UserTier,
  },
];

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Mock login
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      set({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          tier: user.tier,
        },
        isAuthenticated: true 
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  upgradeToTier: (tier: UserTier) => {
    set(state => {
      if (!state.user) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          tier,
          // Clear trial info when upgrading
          trialEndsAt: null
        }
      };
    });
  },
  
  startFreeTrial: () => {
    set(state => {
      if (!state.user) return state;
      
      // Set trial to expire in 7 days
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
      
      return {
        ...state,
        user: {
          ...state.user,
          tier: 'Pro' as UserTier,
          trialEndsAt
        }
      };
    });
  }
}));

// Utility functions to check user tier access
export const canAccessLiteFeatures = (user: User | null): boolean => {
  if (!user) return false;
  return ['Lite', 'Pro'].includes(user.tier);
};

export const canAccessProFeatures = (user: User | null): boolean => {
  if (!user) return false;
  return user.tier === 'Pro' || (user.trialEndsAt && new Date() < user.trialEndsAt);
};

// For automatically logging in a mock user (development only)
export const autoLoginAsTier = (tier: UserTier) => {
  const auth = useAuth.getState();
  const userEmail = tier === 'Free' ? 'free@example.com' : 
                   tier === 'Lite' ? 'lite@example.com' : 
                   'pro@example.com';
  
  auth.login(userEmail, 'password');
};
