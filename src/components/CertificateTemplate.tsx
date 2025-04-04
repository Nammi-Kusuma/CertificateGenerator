import React from 'react';
import { CertificateData } from '../types/certificate';
import { fullbody, border, title, ribbon } from '../assets/assets';

interface CertificateTemplateProps {
  data: CertificateData;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ data }) => {
  return (
    <div
      className={`relative ${data.orientation === 'portrait' ? 'w-[794px] h-[1123px]' : 'w-[1123px] h-[794px]'}`}
      id="certificate-template"
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '15px',
        background: `url(${fullbody})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Border */}
      <div
        className="absolute inset-0"
        style={{
          background: `url(${border})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="absolute top-2 right-10">
        <p className="text-[white]">Certificate No: {data.certificateNo}</p>
      </div>

      {/* Content Container */}
      <div className="relative w-full h-full">
        {/* Certificate Number at top right */}
        {/* <div className="absolute right-10">
          <p className="text-[white]">Certificate No: {data.certificateNo}</p>
        </div> */}

        {/* Header with curved design */}
        <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden">
          <div className="absolute top-9 left-2 flex items-center">
            <div className="">
              <img
                src={title}
                alt="India Drone Academy"
                className="h-16"
              />
            </div>

          </div>
        </div>

        {/* Certificate Title */}
        <div className="absolute top-[220px] left-0 right-0 text-center">
          <h1 className="text-4xl font-bold text-[#8B7355] tracking-wide">CERTIFICATE OF COMPLETION</h1>
          <p className="text-xl mt-6 text-[#8B7355]">This is to Certify that</p>
        </div>

        {/* Name Banner - New Ribbon Design */}
        <div className="absolute top-[-40px] left-0 right-0 flex justify-center z-10">
          <div className="relative w-full px-8">
            <img
              src={ribbon}
              alt="Name Banner"
              className="h-[1200px] min-w-[500px] object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 top-[-429px]">
              <span className="text-3xl font-bold text-[white] uppercase tracking-[0.07em]">{data.name}</span>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="absolute top-[400px] left-0 right-0 text-center">
          <p className="text-lg leading-relaxed">
            Has successfully completed the DGCA approved Remote Pilot Training Course
            <br />
            conducted by Drone Academy Pvt Ltd.
          </p>
        </div>

        {/* Personal Details */}
        <div className="absolute top-[480px] left-[80px] right-[80px]">
          <div className="grid grid-cols-3 gap-8 text-gray-700 mb-6">
            <div>
              <p className="font-semibold mb-1">Aadhar No:</p>
              <p>{data.aadharNo}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Sex:</p>
              <p>{data.sex}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">DOB:</p>
              <p>{data.dob}</p>
            </div>
          </div>
          <div className="mb-8">
            <p className="font-semibold mb-1">Address:</p>
            <p className="text-gray-700">{data.address}</p>
          </div>
        </div>

        {/* Training Details */}
        <div className="absolute top-[600px] left-[80px] right-[80px]">
          <div className="border-t border-b border-gray-300 py-6">
            <p className="font-bold mb-4">TRAINED ON UAS HAVING UIN: {data.uin}</p>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <p className="font-bold text-gray-600 mb-1">CATEGORY OF UAS</p>
                <p className="text-gray-800">ROTORCRAFT</p>
              </div>
              <div>
                <p className="font-bold text-gray-600 mb-1">SUB-CATEGORY OF UAS</p>
                <p className="text-gray-800">RPAS</p>
              </div>
              <div>
                <p className="font-bold text-gray-600 mb-1">CLASS OF UAS</p>
                <p className="text-gray-800">SMALL</p>
              </div>
              <div>
                <p className="font-bold text-gray-600 mb-1">VLOS/BVLOS</p>
                <p className="text-gray-800">VLOS ONLY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Training Hours */}
        <div className="absolute top-[800px] left-[80px] right-[80px]">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="font-bold text-gray-600 mb-2">GROUND CLASSES:</p>
              <p className="text-gray-800">{data.groundClasses}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600 mb-2">SIMULATION CLASSES:</p>
              <p className="text-gray-800">{data.simulationClasses}</p>
            </div>
            <div className="col-span-2">
              <p className="font-bold text-gray-600 mb-2">FLYING TRAINING:</p>
              <p className="text-gray-800">{data.flyingTraining}</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="absolute bottom-[200px] left-[80px] right-[80px] flex justify-between items-end">
          <div className="text-center w-[200px]">
            <div className="border-b border-gray-400 pb-2 mb-2">
              <img
                src="/signatures/manager.png"
                alt="Manager Signature"
                className="h-16 mx-auto object-contain"
              />
            </div>
            <p className="text-gray-600 font-medium">Accountable Manager</p>
          </div>
          <div className="text-center">
            <img
              src="https://raw.githubusercontent.com/yourusername/certificate-generator/main/public/seal.png"
              alt="Seal"
              className="h-28 mx-auto mb-2"
            />
          </div>
          <div className="text-center w-[200px]">
            <div className="border-b border-gray-400 pb-2 mb-2">
              <img
                src="/signatures/trainer.png"
                alt="Trainer Signature"
                className="h-16 mx-auto object-contain"
              />
            </div>
            <p className="text-gray-600 font-medium">RPA Trainer</p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0">
          <p className="text-center text-gray-600 mb-8">
            <span className="font-semibold">Date of Issue:</span> {data.dateOfIssue}
          </p>
          <div
            className="h-[80px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(to right bottom, transparent 50%, #e0e0e0 50%)'
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-[#003366] flex items-center justify-center">
              <p className="text-white mr-8 font-medium">In Collaboration With</p>
              <div className="flex items-center space-x-8">
                <img
                  src="https://raw.githubusercontent.com/yourusername/certificate-generator/main/public/nsdc-logo.png"
                  alt="NSDC"
                  className="h-12"
                />
                <img
                  src="https://raw.githubusercontent.com/yourusername/certificate-generator/main/public/dgca-logo.png"
                  alt="DGCA"
                  className="h-12"
                />
                <img
                  src="https://raw.githubusercontent.com/yourusername/certificate-generator/main/public/assam-logo.png"
                  alt="Government of Assam"
                  className="h-12"
                />
                <img
                  src="https://raw.githubusercontent.com/yourusername/certificate-generator/main/public/asrlm-logo.png"
                  alt="ASRLM"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};