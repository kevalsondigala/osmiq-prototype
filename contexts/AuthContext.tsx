import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, signOut as authSignOut, isAuthenticated, getUser, User } from '../services/authService';
import { SignInData, SignUpData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      if (isAuthenticated()) {
        const storedUser = getUser();
        setUser(storedUser);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleSignIn = async (data: SignInData) => {
    await signIn(data);
    // Get user from localStorage (stored by authService)
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    await signUp(data);
    // Get user from localStorage (stored by authService)
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const handleSignOut = () => {
    authSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        isAuth: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
