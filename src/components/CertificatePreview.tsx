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
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-600 mb-4">No certificate data available</p>
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-screen-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Form
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {data.orientation === 'portrait' ? 'Portrait' : 'Landscape'} Certificate Preview
          </h2>
          <div className="flex justify-center">
            <CertificateTemplate data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}; 