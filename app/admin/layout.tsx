'use client';

import { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import './admin.css';
import { Sidebar } from '@/components/admin/Sidebar';
import { authService } from '@/services/auth.service';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div id="admin-root" className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isMobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header (Mobile + Desktop) */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
            <span className="lg:hidden text-lg font-bold text-[#E63946]">CF Lapa</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => authService.logout()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
