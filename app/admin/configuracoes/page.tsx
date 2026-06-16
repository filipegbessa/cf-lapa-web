'use client';

import { Card } from '@/components/admin/ui/Card';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-lg">
      <h1 className="text-h2 font-bold text-gray-900">Configurações</h1>

      <Card title="Preferências">
        <div className="text-center py-lg text-gray-500">
          <p className="text-body">Página de configurações será implementada aqui.</p>
          <p className="text-sm text-gray-400 mt-md">
            Integração com o backend será realizada na próxima etapa.
          </p>
        </div>
      </Card>
    </div>
  );
}
