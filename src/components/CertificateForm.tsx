import React, { useState } from 'react';
import { Upload, Download, Plus, Trash2, Eye, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { CertificateData } from '../types/certificate';
import { useNavigate } from 'react-router-dom';

interface CertificateFormProps {
  onSubmit: (data: CertificateData[]) => void;
  processing: boolean;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit, processing }) => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [type, setType] = useState<'offline' | 'online'>('offline');
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [individualCertificate, setIndividualCertificate] = useState<CertificateData>({
    name: '',
    certificateNo: '',
    aadharNo: '',
    sex: '',
    dob: '',
    address: '',
    groundClasses: '',
    groundClassesFrom: '',
    groundClassesTo: '',
    simulationClasses: '',
    simulationClassesFrom: '',
    simulationClassesTo: '',
    flyingTraining: '',
    flyingTrainingFrom: '',
    flyingTrainingTo: '',
    dateOfIssue: '',
    orientation: 'portrait',
    type: 'offline',
    trainerSignature: 'dev',
    uin: 'UA005ZTS0TC'
  });
  const navigate = useNavigate();

  // Update orientation when type changes
  const handleTypeChange = (newType: 'offline' | 'online') => {
    setType(newType);
    // Update all existing certificates
    setCertificates(certificates.map(cert => ({
      ...cert,
      type: newType,
      orientation: newType === 'offline' ? 'portrait' : 'landscape'
    })));
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: 'John Doe',
        certificateNo: 'CERT001',
        aadharNo: '1234-5678-9012',
        sex: 'Male',
        dob: '1990-01-01',
        address: 'Sample Address',
        groundClassesFrom: '2024-01-01',
        groundClassesTo: '2024-01-15',
        simulationClassesFrom: '2024-01-16',
        simulationClassesTo: '2024-01-25',
        flyingTrainingFrom: '2024-01-26',
        flyingTrainingTo: '2024-02-10',
        dateOfIssue: '2024-03-15',
        trainerSignature: 'dev',
        photo: 'https://example.com/path/to/photo.jpg' // Example photo URL
      }
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(template);
    
    // Add dropdown validation for trainer signature
    if (!ws['!dataValidation']) {
      ws['!dataValidation'] = [];
    }

    // Define the validation rule for trainer signature column
    const validationRule = {
      sqref: 'N2:N1000',
      type: 'list',
      values: ['dev', 'vamsi', 'sumith'],
      showDropDown: true,
      error: 'Please select a valid trainer signature',
      errorTitle: 'Invalid Trainer Signature',
      promptTitle: 'Select Trainer',
      prompt: 'Please select the trainer signature from the dropdown'
    };

    // Add the validation rule
    ws['!dataValidation'].push(validationRule);
    
    // Add column headers with notes
    const photoCell = ws['O1'];
    if (photoCell) {
      photoCell.c = [{ 
        a: "Photo URL",
        t: "Enter the URL or file path of the student's photo"
      }];
    }
    
    // Add column widths
    const colWidths = [
      { wch: 20 }, // name
      { wch: 15 }, // certificateNo
      { wch: 15 }, // aadharNo
      { wch: 10 }, // sex
      { wch: 12 }, // dob
      { wch: 30 }, // address
      { wch: 12 }, // groundClassesFrom
      { wch: 12 }, // groundClassesTo
      { wch: 12 }, // simulationClassesFrom
      { wch: 12 }, // simulationClassesTo
      { wch: 12 }, // flyingTrainingFrom
      { wch: 12 }, // flyingTrainingTo
      { wch: 12 }, // dateOfIssue
      { wch: 20 }, // trainerSignature
      { wch: 40 }  // photo URL
    ];
    ws['!cols'] = colWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Template');

    // Create a new worksheet for the dropdown values
    const validationWs = XLSX.utils.aoa_to_sheet([
      ['Trainer Signatures'],
      ['dev'],
      ['vamsi'],
      ['sumith']
    ]);
    XLSX.utils.book_append_sheet(wb, validationWs, 'Validation Data');

    // Save the workbook
    XLSX.writeFile(wb, 'certificate_template.xlsx');
  };

  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setIndividualCertificate({
      ...individualCertificate,
      photo: link
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process each row
      const formattedData = jsonData.map((row: any) => {
        // Extract and clean trainer signature
        const rawSignature = String(row.trainerSignature || '').toLowerCase().trim();
        const cleanSignature = rawSignature.split('(')[0].trim();
        let trainerSign: 'dev' | 'vamsi' | 'sumith' = 'dev';
        if (cleanSignature === 'vamsi' || cleanSignature === 'sumith') {
          trainerSign = cleanSignature;
        }

        const formattedCertificate: CertificateData = {
          name: row.name || '',
          certificateNo: row.certificateNo || '',
          aadharNo: row.aadharNo || '',
          sex: row.sex || '',
          dob: row.dob || '',
          address: row.address || '',
          groundClasses: row.groundClasses || '',
          groundClassesFrom: row.groundClassesFrom || '',
          groundClassesTo: row.groundClassesTo || '',
          simulationClasses: row.simulationClasses || '',
          simulationClassesFrom: row.simulationClassesFrom || '',
          simulationClassesTo: row.simulationClassesTo || '',
          flyingTraining: row.flyingTraining || '',
          flyingTrainingFrom: row.flyingTrainingFrom || '',
          flyingTrainingTo: row.flyingTrainingTo || '',
          dateOfIssue: row.dateOfIssue || '',
          orientation: type === 'offline' ? 'portrait' : 'landscape',
          type,
          trainerSignature: trainerSign,
          uin: type === 'offline' ? 'UA005ZTS0TC' : 'UA005ZQS0TC',
          photo: row.photo || ''
        };

        return formattedCertificate;
      });

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
    const newCertificate: CertificateData = {
      ...individualCertificate,
      type,
      orientation: type === 'offline' ? 'portrait' as const : 'landscape' as const,
      trainerSignature: individualCertificate.trainerSignature || 'dev',
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
      groundClassesFrom: '',
      groundClassesTo: '',
      simulationClasses: '',
      simulationClassesFrom: '',
      simulationClassesTo: '',
      flyingTraining: '',
      flyingTrainingFrom: '',
      flyingTrainingTo: '',
      dateOfIssue: '',
      orientation: type === 'offline' ? 'portrait' : 'landscape',
      type: type,
      trainerSignature: 'dev',
      uin: type === 'offline' ? 'UA005ZTS0TC' : 'UA005ZQS0TC'
    });
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Certificate Generator</h2>
          
          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value as 'offline' | 'online')}
                disabled={processing}
              >
                <option value="offline">Offline (Portrait)</option>
                <option value="online">Online (Landscape)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <button
              type="button"
              onClick={downloadTemplate}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto"
              disabled={processing}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Template
            </button>
            <button
              type="button"
              onClick={() => setShowIndividualForm(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full md:w-auto"
              disabled={processing}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Individual
            </button>
          </div>

          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center cursor-pointer hover:border-blue-500 ${
              processing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <input {...getInputProps()} disabled={processing} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop an Excel file here, or click to select one
            </p>
          </div>

          {certificates.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold">Certificates ({certificates.length})</h3>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => navigate(type === 'offline' ? '/preview/portrait' : '/preview/landscape')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={processing}
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    Preview Certificate
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto"
                    disabled={processing}
                  >
                    {processing ? 'Generating...' : 'Generate Certificates'}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate No</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{cert.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{cert.certificateNo}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <button
                            type="button"
                            onClick={() => removeCertificate(index)}
                            className="text-red-600 hover:text-red-800"
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
        </div>

        {showIndividualForm && (
          <div className="mt-6 p-4 md:p-6 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">Individual Certificate Details</h4>
              <button
                type="button"
                onClick={() => setShowIndividualForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700">Photo URL (Google Photos)</label>
                <div className="mt-1 space-y-2">
                  <input
                    type="url"
                    placeholder="Enter Google Photos link"
                    value={individualCertificate.photo || ''}
                    onChange={handleImageLinkChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {individualCertificate.photo && (
                    <div className="w-32 h-40 border-2 border-gray-300">
                      <img
                        src={individualCertificate.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '';
                          e.currentTarget.alt = 'Invalid image URL';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
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
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">From</label>
                    <input
                      type="date"
                      value={individualCertificate.groundClassesFrom}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, groundClassesFrom: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">To</label>
                    <input
                      type="date"
                      value={individualCertificate.groundClassesTo}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, groundClassesTo: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Simulation Classes</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">From</label>
                    <input
                      type="date"
                      value={individualCertificate.simulationClassesFrom}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, simulationClassesFrom: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">To</label>
                    <input
                      type="date"
                      value={individualCertificate.simulationClassesTo}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, simulationClassesTo: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Flying Training</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">From</label>
                    <input
                      type="date"
                      value={individualCertificate.flyingTrainingFrom}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, flyingTrainingFrom: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">To</label>
                    <input
                      type="date"
                      value={individualCertificate.flyingTrainingTo}
                      onChange={(e) => setIndividualCertificate({...individualCertificate, flyingTrainingTo: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
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
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleIndividualSubmit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Certificate
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};