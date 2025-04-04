import React from 'react';
import { CertificateData } from '../types/certificate';
import { fullbody, border, title, ribbon, stamp, footer } from '../assets/assets';

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
        padding: '2px',
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

      <div className="absolute top-0 right-10">
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
          <div className="absolute top-9 left-4 flex items-center">
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
        <div className="absolute top-[480px] left-[80px] right-[40px] border-b border-gray-400">
          <div className="grid grid-cols-3 text-left mb-2">
            <div>
              <span className="font-semibold text-sm">Aadhar No: </span>
              <span className="text-sm">{data.aadharNo}</span>
            </div>
            <div>
              <span className="font-semibold text-sm">Sex: </span>
              <span className="text-sm">{data.sex}</span>
            </div>
            <div>
              <span className="font-semibold text-sm">DOB: </span>
              <span className="text-sm">{data.dob}</span>
            </div>
          </div>
          <div className="mb-6">
            <span className="font-semibold text-sm">Address: </span>
            <span className="text-sm">{data.address}</span>
          </div>
        </div>

        {/* Training Details */}
        <div className="absolute top-[570px] left-[80px] right-[40px] pb-6 border-b border-gray-400">
          <p className="font-bold text-sm">TRAINED ON UAS HAVING UIN : {data.uin}</p>
          <div className="w-full mt-2">
            <div className="grid grid-cols-4" style={{ paddingLeft: 0 }}>
              <div className="pr-4">
                <p className="font-bold text-sm mb-2">CATEGORY OF UAS</p>
                <p className="text-sm">ROTORCRAFT</p>
              </div>
              <div className="">
                <p className="font-bold text-sm mb-2 whitespace-nowrap">SUB-CATEGORY OF UAS</p>
                <p className="text-sm">RPAS</p>
              </div>
              <div className="pr-4 pl-4">
                <p className="font-bold text-sm mb-2">CLASS OF UAS</p>
                <p className="text-sm">SMALL</p>
              </div>
              <div>
                <p className="font-bold text-sm mb-2">VLOS/BVLOS</p>
                <p className="text-sm">VLOS ONLY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Training Hours */}
        <div className="absolute top-[680px] left-[80px] right-[40px]">
          <div className="flex flex-col gap-y-2">
            <div className="flex">
              <p className="font-bold text-sm w-[180px]">GROUND CLASSES</p>
              <p className="text-sm">: 24 MAR 2025 - 25 MAR 2025</p>
            </div>
            <div className="flex">
              <p className="font-bold text-sm w-[180px]">SIMULATION TRAINING</p>
              <p className="text-sm">: 26 MAR 2025</p>
            </div>
            <div className="flex">
              <p className="font-bold text-sm w-[180px]">FLYING TRAINING</p>
              <p className="text-sm">: 27 MAR 2025 - 28 MAR 2025</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="absolute bottom-[180px] left-[80px] right-[80px] flex justify-between items-end">
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
              src={stamp}
              alt="Seal"
              className="h-40 w-40 mx-auto mt-16"
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

        <div className="absolute bottom-0 left-0 right-0">
          <div className="relative h-[160px]">
            <img
              src={footer}
              alt="Footer"
              className="w-full h-full"
              style={{ objectFit: 'fill' }}
            />
            <p className="absolute top-0 left-0 right-0 text-center text-gray-600">
              <span className="font-semibold">Date of Issue : </span>28 March 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};