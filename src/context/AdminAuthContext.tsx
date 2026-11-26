'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import { AdminUser } from '@/types';

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const res = await api.adminGetMe();
      const adminUser = res?.admin || res?.data?.admin || res?.data;
      if (res && res.success && adminUser) {
        setAdmin(adminUser);
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await api.adminLogin(credentials);
    const adminUser = res?.admin || res?.data?.admin || res?.data;
    if (res && res.success && adminUser) {
      if (res.token && typeof window !== 'undefined') {
        localStorage.setItem('admin_token', res.token);
      }
      setAdmin(adminUser);
      router.push('/admin');
    } else {
      throw new Error(res?.message || 'Login failed. Please check credentials.');
    }
  };

  const logout = async () => {
    try {
      await api.adminLogout();
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
    setAdmin(null);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        refreshAdmin: checkAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
