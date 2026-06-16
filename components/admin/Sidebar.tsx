'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  BarChart2,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/movimentos', label: 'Movimentos', icon: Dumbbell },
  { href: '/admin/treinos', label: 'Treinos', icon: CalendarDays },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen w-72 bg-[#1B2833] text-white
        flex flex-col z-50
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        <Link href="/admin/dashboard" className="text-2xl font-bold">
          CF Lapa
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-[#E63946] text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section (Footer) */}
      <div className="border-t border-gray-700 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center font-semibold text-sm">
            P
          </div>
          <span className="text-sm font-medium">Professor</span>
        </div>
      </div>
    </aside>
  );
}
