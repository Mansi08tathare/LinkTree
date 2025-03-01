import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profileImage: string;
  bio: string;
  isOnboarded: boolean;
  bannerColor: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (categories: string[]) => void;
  updateProfile: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock user data
        const mockUser: User = {
          id: '1',
          name: 'Jenny Wilson',
          email: email,
          username: 'opopo_08',
          profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          bio: '',
          isOnboarded: Math.random() > 0.5, // Randomly determine if user has completed onboarding
          bannerColor: '#333333'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock user data
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          username: 'opopo_08',
          profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
          bio: '',
          isOnboarded: false,
          bannerColor: '#333333'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const completeOnboarding = (categories: string[]) => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      completeOnboarding,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};