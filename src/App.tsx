import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CertificateForm } from './components/CertificateForm';
import { CertificateTemplate } from './components/CertificateTemplate';
import { CertificateData } from './types/certificate';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [processing, setProcessing] = useState(false);

  const handleGenerateCertificates = async (data: CertificateData[]) => {
    try {
      setProcessing(true);
      const zip = new JSZip();
      
      for (const certificate of data) {
        // Create a temporary container for the certificate
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        document.body.appendChild(container);

        // Render the certificate template
        const root = createRoot(container);
        root.render(<CertificateTemplate data={certificate} />);

        // Wait for images to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Convert to canvas and then to JPG
        const element = container.firstChild as HTMLElement;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        });

        // Convert canvas to blob
        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.95);
        });

        // Add to zip
        zip.file(`${certificate.name}_certificate.jpg`, blob);

        // Cleanup
        root.unmount();
        document.body.removeChild(container);
      }
      
      // Generate and download zip
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificates.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating certificates:', error);
    } finally {
      setProcessing(false);
    }
  };

  const data: CertificateData = {
    name: "John Doe",
    certificateNo: "",
    aadharNo: "1234567890",
    sex: "Male",
    dob: "1990-01-01",
    address: "123 Main St, Anytown, USA",
    groundClasses: "10",
    simulationClasses: "20",
    flyingTraining: "30",
    dateOfIssue: "2024-01-01",
    orientation: "portrait" as const,
    type: 'offline',
    signatureMode: 1,
    uin: "1234567890"
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-white text-xl font-semibold">
                  Certificate Generator
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-10">
          <Routes>
            <Route path="/" element={<CertificateForm onSubmit={handleGenerateCertificates} processing={processing} />} />
            <Route path="/certificate" element={<CertificateTemplate data={data}/>} />
            {/* <Route path="/certificate1" element={<CertificateTemplate1 data={data}/>} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;