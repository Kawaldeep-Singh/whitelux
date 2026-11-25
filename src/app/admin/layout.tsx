'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AdminAuthProvider,
  useAdminAuth,
} from '@/context/AdminAuthContext';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !admin && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [admin, loading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-[#FAF7F0] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C9A24B] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif tracking-widest text-[#C9A24B] text-sm uppercase">Loading White Luxe CMS...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: Building2 },
    { label: 'Blogs', href: '/admin/blogs', icon: FileText },
    { label: 'Leads & Enquiries', href: '/admin/leads', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#FAF7F0] flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="White Luxe" className="h-8 w-auto object-contain rounded" />
          <span className="font-serif text-lg tracking-wider text-[#C9A24B]">WHITE LUXE</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#FAF7F0] p-1.5 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#121212] border-r border-[#262626] flex-shrink-0 flex flex-col justify-between z-30`}
      >
        <div>
          {/* Brand header */}
          <div className="hidden md:flex items-center gap-3.5 px-6 py-6 border-b border-[#222]">
            <img src="/logo.jpeg" alt="White Luxe" className="h-10 w-auto object-contain rounded" />
            <div>
              <h1 className="font-serif text-lg tracking-widest text-[#FAF7F0] leading-none">
                WHITE LUXE
              </h1>
              <p className="text-[10px] tracking-wider text-[#C9A24B] uppercase font-sans mt-1">
                Admin Console
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#C9A24B] text-[#0B0B0B] shadow-sm font-semibold'
                      : 'text-[#C9C6C0] hover:text-[#FAF7F0] hover:bg-[#1C1B1B]'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#0B0B0B]' : 'text-[#C9A24B]'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#222] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#1A1A1A] rounded transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Live Website
            </span>
            <ChevronRight size={14} />
          </Link>

          <div className="pt-2 border-t border-[#1C1B1B] flex items-center justify-between px-2">
            <div className="overflow-hidden pr-2">
              <p className="text-xs font-medium text-[#FAF7F0] truncate">{admin.name}</p>
              <p className="text-[10px] text-[#7E7B73] truncate">{admin.email}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-[#9A8F7E] hover:text-red-400 hover:bg-[#201F1F] rounded transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#0A0A0A] overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
