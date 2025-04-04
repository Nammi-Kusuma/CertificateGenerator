import React from 'react';
import { CertificateData } from '../types/certificate';
import { fullbody, border, title, ribbon, stamp, footer, accountsign, devsign, vamsisign, sumithsign } from '../assets/assets';

interface CertificateTemplateProps {
  data: CertificateData;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ data }) => {
  const isLandscape = data.orientation === 'landscape';

  const getTrainerSignature = () => {
    switch(data.trainerSignature) {
      case 'vamsi':
        return vamsisign;
      case 'sumith':
        return sumithsign;
      case 'dev':
      default:
        return devsign;
    }
  };

  return (
    <div
      className={`relative ${isLandscape ? 'w-[1123px] h-[794px]' : 'w-[794px] h-[1123px]'}`}
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
          backgroundPosition: 'center',
          zIndex: 100
        }}
      />

      {/* Certificate Number */}
      <div className="absolute top-0 right-10">
        <p className="text-[white]">Certificate No: {data.certificateNo}</p>
      </div>

      {/* Header with Logo */}
      <div className={`absolute ${isLandscape ? 'top-8' : 'top-9'} left-4 flex items-center`}>
        <div>
          <img
            src={title}
            alt="India Drone Academy"
            className={`${isLandscape ? 'h-16' : 'h-16'}`}
          />
        </div>
      </div>

      {/* Certificate Title */}
      <div className={`absolute ${isLandscape ? 'top-[140px]' : 'top-[250px]'} left-0 right-0 text-center z-20`}>
        <h1 className="text-4xl font-bold text-[#8B7355] tracking-wide">CERTIFICATE OF COMPLETION</h1>
        <p className="text-xl mt-6 text-[#8B7355]">This is to Certify that</p>
      </div>

      {/* Name Banner */}
      <div className={`absolute ${isLandscape ? 'top-[200px]' : 'top-[5px]'} left-0 right-0 flex justify-center z-30`}>
        <div className={`relative w-full ${isLandscape ? 'px-4' : 'px-8'}`}>
          <img
            src={ribbon}
            alt="Name Banner"
            className={`${
              isLandscape 
                ? 'h-[1200px] min-w-[800px] transform scale-75' 
                : 'h-[1200px] min-w-[500px]'
            } object-contain mx-auto`}
          />
          <div className={`absolute inset-0 flex items-center justify-center z-20 ${
            isLandscape 
              ? 'top-[-380px]' 
              : 'top-[-429px]'
          }`}>
            <span className={`text-3xl font-bold text-[white] uppercase tracking-[0.07em] ${
              isLandscape ? 'mt-16' : ''
            }`}>
              {data.name}
            </span>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className={`absolute ${isLandscape ? 'top-[280px]' : 'top-[440px]'} left-0 right-0 text-center z-10`}>
        <p className="text-lg leading-relaxed">
          Has successfully completed the DGCA approved Remote Pilot Training Course
          <br />
          conducted by Drone Academy Pvt Ltd.
        </p>
      </div>

      {/* Personal Details */}
      <div className={`absolute ${isLandscape ? 'top-[340px]' : 'top-[520px]'} left-[80px] right-[40px] border-b border-gray-400 mb-2`}>
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
      <div className={`absolute ${isLandscape ? 'top-[420px]' : 'top-[600px]'} left-[80px] right-[40px] border-b border-gray-400 pb-4`}>
        <p className="font-bold text-sm">TRAINED ON UAS HAVING UIN : {data.uin}</p>
        <div className="w-full mt-2">
          <div className="grid grid-cols-4" style={{ paddingLeft: 0 }}>
            <div className="pr-4">
              <p className="font-bold text-sm mb-2">CATEGORY OF UAS</p>
              <p className="text-sm">ROTORCRAFT</p>
            </div>
            <div>
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
      <div className={`absolute ${isLandscape ? 'top-[500px]' : 'top-[700px]'} left-[80px] right-[40px]`}>
        <div className="flex flex-col gap-y-2">
          <div className="flex">
            <p className="font-bold text-sm w-[180px]">GROUND CLASSES</p>
            <p className="text-sm">: {data.groundClasses}</p>
          </div>
          <div className="flex">
            <p className="font-bold text-sm w-[180px]">SIMULATION TRAINING</p>
            <p className="text-sm">: {data.simulationClasses}</p>
          </div>
          <div className="flex">
            <p className="font-bold text-sm w-[180px]">FLYING TRAINING</p>
            <p className="text-sm">: {data.flyingTraining}</p>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className={`absolute ${isLandscape ? 'bottom-[100px]' : 'bottom-[180px]'} left-[80px] right-[80px] flex justify-between items-end`}>
        <div className="text-center w-[200px]">
          <div className="border-b border-gray-400 pb-1 mb-1">
            <img
              src={accountsign}
              alt="Account Manager Signature"
              className="h-16 w-[180px] mx-auto object-contain"
            />
          </div>
          <p className="text-gray-600 font-medium">Accountable Manager</p>
        </div>
        <div className="text-center">
          <img
            src={stamp}
            alt="Seal"
            className={`${isLandscape ? 'h-28' : 'h-40'} w-40 mx-auto mt-16`}
          />
        </div>
        <div className="text-center w-[200px]">
          <div className="border-b border-gray-400 pb-1 mb-1">
            <img
              src={getTrainerSignature()}
              alt={`${data.trainerSignature} Trainer Signature`}
              className="h-16 w-[180px] mx-auto object-contain"
            />
          </div>
          <p className="text-gray-600 font-medium">RPA Trainer</p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className={`relative ${isLandscape ? 'h-[120px]' : 'h-[160px]'}`}>
          <img
            src={footer}
            alt="Footer"
            className="w-full h-full"
            style={{ objectFit: 'fill' }}
          />
          <p className="absolute top-0 left-0 right-0 text-center text-gray-600">
            <span className="font-semibold">Date of Issue : </span>{data.dateOfIssue}
          </p>
        </div>
      </div>
    </div>
  );
};