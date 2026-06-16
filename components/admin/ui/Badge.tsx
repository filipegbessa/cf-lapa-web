'use client';

import { ReactNode } from 'react';

type BadgeType = 'warmup' | 'skill' | 'wod' | 'amrap' | 'emom' | 'for-time' | 'tabata' | 'success' | 'danger' | 'info';

interface BadgeProps {
  children: ReactNode;
  type: BadgeType;
  className?: string;
}

const typeClasses: Record<BadgeType, string> = {
  warmup: 'bg-[#E63946] text-white text-xs font-semibold px-2 py-1 rounded',
  skill: 'bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded',
  wod: 'bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded',
  amrap: 'bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded',
  emom: 'bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded',
  'for-time': 'bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded',
  tabata: 'bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded',
  success: 'bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded',
  danger: 'bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded',
  info: 'bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded',
};

export function Badge({ children, type, className = '' }: BadgeProps) {
  return (
    <span className={`${typeClasses[type]} inline-flex ${className}`}>
      {children}
    </span>
  );
}
