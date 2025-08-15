import { createContext, useContext, useState, useEffect } from 'react';
import { Client, Account } from 'appwrite';
import { appwriteEndpoint, appwriteProjectId } from '../data/config.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const client = new Client()
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

  const account = new Account(client);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      await checkAuthStatus();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    console.log('AuthContext: logout called');
    try {
      console.log('AuthContext: deleting sessions...');
      await account.deleteSessions();
      console.log('AuthContext: sessions deleted successfully');
      setUser(null);
      console.log('AuthContext: user state cleared');
      return { success: true };
    } catch (error) {
      console.error('AuthContext: logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
