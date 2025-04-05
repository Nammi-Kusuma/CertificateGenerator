import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CertificateForm } from './components/CertificateForm';
import { CertificateTemplate } from './components/CertificateTemplate';
import { CertificatePreview } from './components/CertificatePreview';
import { CertificateData } from './types/certificate';
import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [processing, setProcessing] = useState(false);

  const loadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.crossOrigin = "anonymous"; // Enable CORS
      img.src = url;
    });
  };

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

        // Render certificate in selected orientation
        const root = createRoot(container);
        root.render(<CertificateTemplate data={certificate} />);

        // Wait for render and images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        const element = container.firstChild as HTMLElement;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        });

        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.95);
        });
        zip.file(`${certificate.name}_${certificate.orientation}_certificate.jpg`, blob);

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

  const portraitData: CertificateData = {
    name: "RAHUL KUMAR",
    certificateNo: "IDA/2024/001",
    aadharNo: "1234 5678 9012",
    sex: "Male",
    dob: "15 Jan 1995",
    address: "123, Green Park Extension, New Delhi - 110016",
    groundClasses: "24 Hours",
    groundClassesFrom: "24 MAR 2025",
    groundClassesTo: "25 MAR 2025",
    simulationClasses: "12 Hours",
    simulationClassesFrom: "26 MAR 2025",
    simulationClassesTo: "26 MAR 2025",
    flyingTraining: "16 Hours",
    flyingTrainingFrom: "27 MAR 2025",
    flyingTrainingTo: "28 MAR 2025",
    dateOfIssue: "28 March 2025",
    orientation: "portrait" as const,
    type: "offline",
    trainerSignature: "dev",
    uin: "UA-23-ABC-123"
  }

  const landscapeData: CertificateData = {
    ...portraitData,
    certificateNo: "IDA/2024/002",
    orientation: "landscape" as const,
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
            <Route path="/preview/portrait" element={<CertificatePreview data={portraitData} />} />
            <Route path="/preview/landscape" element={<CertificatePreview data={landscapeData} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;