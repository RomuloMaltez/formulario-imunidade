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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
      {/* Lista de Documentos */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          Documentos Necessários para Anexar
        </h3>
        <ul className="space-y-2">
          {documentos.map((doc, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <span className="text-gray-500 font-bold mr-3 mt-0.5">✓</span>
              <span className="flex-1">{doc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Observações Importantes */}
      {observacoes.length > 0 && (
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            Observações Importantes
          </h3>
          <ul className="space-y-2">
            {observacoes.map((obs, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="text-gray-500 font-bold mr-3 mt-0.5">•</span>
                <span className="flex-1">{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Informações sobre o Certificado */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          Sobre o Certificado de Imunidade
        </h3>
        <div className="space-y-2 text-gray-700">
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
