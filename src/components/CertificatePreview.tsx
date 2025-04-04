import React from 'react';
import { CertificateTemplate } from './CertificateTemplate';
import { CertificateData } from '../types/certificate';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CertificatePreviewProps {
  data?: CertificateData;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data: propData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = propData || location.state?.data;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl text-gray-600 mb-4 text-center">No certificate data available</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Form
        </button>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">
            {data.orientation === 'portrait' ? 'Portrait' : 'Landscape'} Certificate Preview
          </h2>
          <div className="border border-gray-300 rounded-lg shadow-lg p-2 md:p-4 bg-white">
            <div className="min-w-fit">
              <CertificateTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 