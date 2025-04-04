import React, { useState } from 'react';
import { Upload, Download, Plus, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { CertificateData } from '../types/certificate';

interface CertificateFormProps {
  onSubmit: (data: CertificateData[]) => void;
  processing: boolean;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit, processing }) => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [type, setType] = useState<'offline' | 'online'>('offline');
  const [signatureMode, setSignatureMode] = useState<1 | 2 | 3>(1);
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [individualCertificate, setIndividualCertificate] = useState<CertificateData>({
    name: '',
    certificateNo: '',
    aadharNo: '',
    sex: '',
    dob: '',
    address: '',
    groundClasses: '',
    simulationClasses: '',
    flyingTraining: '',
    dateOfIssue: '',
    orientation: 'portrait',
    type: 'offline',
    signatureMode: 1,
    uin: 'UA005ZTS0TC'
  });

  const downloadTemplate = () => {
    const template = [
      {
        name: 'John Doe',
        certificateNo: 'CERT001',
        aadharNo: '1234-5678-9012',
        sex: 'Male',
        dob: '1990-01-01',
        address: 'Sample Address',
        groundClasses: '20 Hours',
        simulationClasses: '10 Hours',
        flyingTraining: '15 Hours',
        dateOfIssue: '2024-03-15'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    
    // Add column widths
    const colWidths = [
      { wch: 20 }, // name
      { wch: 15 }, // certificateNo
      { wch: 15 }, // aadharNo
      { wch: 10 }, // sex
      { wch: 12 }, // dob
      { wch: 30 }, // address
      { wch: 15 }, // groundClasses
      { wch: 15 }, // simulationClasses
      { wch: 15 }, // flyingTraining
      { wch: 12 }  // dateOfIssue
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, 'certificate_template.xlsx');
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((row: any) => ({
        name: row.name || '',
        certificateNo: row.certificateNo || '',
        aadharNo: row.aadharNo || '',
        sex: row.sex || '',
        dob: row.dob || '',
        address: row.address || '',
        groundClasses: row.groundClasses || '',
        simulationClasses: row.simulationClasses || '',
        flyingTraining: row.flyingTraining || '',
        dateOfIssue: row.dateOfIssue || '',
        orientation,
        type,
        signatureMode,
        uin: type === 'offline' ? 'UA005ZTS0TC' : 'UA005ZQS0TC'
      }));

      setCertificates(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(certificates);
  };

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCertificate = {
      ...individualCertificate,
      orientation,
      type,
      signatureMode,
      uin: type === 'offline' ? 'UA005ZTS0TC' : 'UA005ZQS0TC'
    };
    setCertificates([...certificates, newCertificate]);
    setShowIndividualForm(false);
    setIndividualCertificate({
      name: '',
      certificateNo: '',
      aadharNo: '',
      sex: '',
      dob: '',
      address: '',
      groundClasses: '',
      simulationClasses: '',
      flyingTraining: '',
      dateOfIssue: '',
      orientation: 'portrait',
      type: 'offline',
      signatureMode: 1,
      uin: 'UA005ZTS0TC'
    });
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Certificate Generator</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Orientation</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                disabled={processing}
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value as 'offline' | 'online')}
                disabled={processing}
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Signature Mode</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={signatureMode}
                onChange={(e) => setSignatureMode(Number(e.target.value) as 1 | 2 | 3)}
                disabled={processing}
              >
                <option value={1}>Mode 1</option>
                <option value={2}>Mode 2</option>
                <option value={3}>Mode 3</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Add Certificates</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={downloadTemplate}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                disabled={processing}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </button>
              <button
                type="button"
                onClick={() => setShowIndividualForm(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                disabled={processing}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Individual
              </button>
            </div>
          </div>

          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 ${
              processing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <input {...getInputProps()} disabled={processing} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop an Excel file here, or click to select one
            </p>
          </div>

          {showIndividualForm && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-medium mb-4">Individual Certificate Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={individualCertificate.name}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Certificate No</label>
                  <input
                    type="text"
                    value={individualCertificate.certificateNo}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, certificateNo: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhar No</label>
                  <input
                    type="text"
                    value={individualCertificate.aadharNo}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, aadharNo: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sex</label>
                  <select
                    value={individualCertificate.sex}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, sex: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={individualCertificate.dob}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, dob: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={individualCertificate.address}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, address: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ground Classes</label>
                  <input
                    type="text"
                    value={individualCertificate.groundClasses}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, groundClasses: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Simulation Classes</label>
                  <input
                    type="text"
                    value={individualCertificate.simulationClasses}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, simulationClasses: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flying Training</label>
                  <input
                    type="text"
                    value={individualCertificate.flyingTraining}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, flyingTraining: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Issue</label>
                  <input
                    type="date"
                    value={individualCertificate.dateOfIssue}
                    onChange={(e) => setIndividualCertificate({...individualCertificate, dateOfIssue: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowIndividualForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleIndividualSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Certificate
                </button>
              </div>
            </div>
          )}

          {certificates.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Certificates List</h3>
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{cert.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cert.certificateNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cert.dateOfIssue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => removeCertificate(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                processing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={processing || certificates.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              {processing ? 'Generating Certificates...' : 'Generate Certificates'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};