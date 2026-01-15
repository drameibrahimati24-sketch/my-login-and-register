import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '../types';
import * as mockDb from '../services/mockDb';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('jobnexus_user');
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = mockDb.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const safeUser = { ...user };
      delete safeUser.password;
      localStorage.setItem('jobnexus_user', JSON.stringify(safeUser));
      setState({
        user: safeUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = mockDb.getUsers();
    if (users.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      username,
      password,
      role: UserRole.MEMBER // Default to member
    };

    mockDb.saveUsers([...users, newUser]);
    
    // Auto login
    const safeUser = { ...newUser };
    delete safeUser.password;
    localStorage.setItem('jobnexus_user', JSON.stringify(safeUser));
    setState({
      user: safeUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('jobnexus_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!state.user) throw new Error('No user logged in');

    const updatedUser = { ...state.user, ...data };
    
    // Update in DB
    mockDb.updateUser(updatedUser);
    
    // Update in Local Storage (Session)
    localStorage.setItem('jobnexus_user', JSON.stringify(updatedUser));
    
    // Update State
    setState(prev => ({
      ...prev,
      user: updatedUser
    }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};