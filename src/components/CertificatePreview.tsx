import React from 'react';
import { CertificateTemplate } from './CertificateTemplate';
import { CertificateData } from '../types/certificate';

interface CertificatePreviewProps {
  data: CertificateData;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-8 items-center p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">
          {data.orientation === 'portrait' ? 'Portrait' : 'Landscape'} Certificate
        </h2>
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
          <CertificateTemplate data={data} />
        </div>
      </div>
    </div>
  );
}; 