// src/context/AuthContext.tsx  (no types)
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../lib/api'; // adjust path if needed

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // load session
  const loadMe = async () => {
    try {
      const res = await authApi.me();
      const data = res?.data ?? null;
      setUser(data?.user ?? null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.userLogin({ email, password });
    // backend both sets cookie and returns user in response
    const returnedUser = res?.data?.user ?? null;
    if (returnedUser) setUser(returnedUser);
    else await loadMe(); // fallback
    navigate('/dashboard');
  };

  const registerUser = async (payload) => {
    const res = await authApi.userRegister(payload);
    const returnedUser = res?.data?.user ?? null;
    if (returnedUser) setUser(returnedUser);
    else await loadMe();
    navigate('/dashboard');
  };

  const registerPartner = async (payload) => {
    const res = await authApi.partnerRegister(payload);
    const returnedUser = res?.data?.user ?? null;
    if (returnedUser) setUser(returnedUser);
    else await loadMe();
    navigate('/dashboard');
  };

  const logoutUser = async () => {
    try {
      await authApi.userLogout();
    } catch (e) {}
    setUser(null);
    navigate('/login');
  };

  const logoutPartner = async () => {
    try {
      await authApi.partnerLogout();
    } catch (e) {}
    setUser(null);
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logoutUser,
      logoutPartner,
      registerUser,
      registerPartner,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
