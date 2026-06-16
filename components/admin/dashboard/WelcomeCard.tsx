'use client';

import { Card } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { Plus } from 'lucide-react';

interface WelcomeCardProps {
  name?: string;
  workoutsThisWeek: number;
}

export function WelcomeCard({ name = 'Professor', workoutsThisWeek }: WelcomeCardProps) {
  return (
    <Card
      className="mb-6 bg-gradient-to-r from-[#E63946] to-red-700 text-white border-0"
      action={<Button variant="secondary" size="sm" className="text-gray-900"><Plus size={16} /> Novo Treino</Button>}
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, {name}!</h2>
        <p className="text-base opacity-90">
          Você tem <strong>{workoutsThisWeek} treino{workoutsThisWeek !== 1 ? 's' : ''}</strong> esta semana
        </p>
      </div>
    </Card>
  );
}
