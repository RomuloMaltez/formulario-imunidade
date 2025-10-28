import React from 'react';
import { documentosNecessarios, observacoesImportantes, PRAZO_VALIDADE_CERTIFICADO } from '@/lib/documentos-necessarios';

interface DocumentosNecessariosProps {
  tipo: string;
}

export const DocumentosNecessarios: React.FC<DocumentosNecessariosProps> = ({ tipo }) => {
  const documentos = documentosNecessarios[tipo] || [];
  const observacoes = observacoesImportantes[tipo] || [];

  if (documentos.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Lista de Documentos */}
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
          📎 Documentos Necessários para Anexar
        </h3>
        <ul className="space-y-2">
          {documentos.map((doc, index) => (
            <li key={index} className="flex items-start text-blue-800">
              <span className="text-blue-600 font-bold mr-3 mt-0.5">✓</span>
              <span className="flex-1">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Observações Importantes */}
      {observacoes.length > 0 && (
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center">
            ⚠️ Observações Importantes
          </h3>
          <ul className="space-y-2">
            {observacoes.map((obs, index) => (
              <li key={index} className="flex items-start text-yellow-800">
                <span className="text-yellow-600 font-bold mr-3 mt-0.5">•</span>
                <span className="flex-1">{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Informações sobre o Certificado */}
      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
        <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center">
          📋 Sobre o Certificado de Imunidade
        </h3>
        <div className="space-y-2 text-green-800">
          <p>
            <strong>Validade:</strong> {PRAZO_VALIDADE_CERTIFICADO}
          </p>
          <p className="text-sm">
            O certificado deverá ser renovado ao final do período mediante novo processo de autodeclaração.
          </p>
        </div>
      </div>
    </div>
  );
};
