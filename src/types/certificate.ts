export interface CertificateData {
  name: string;
  certificateNo: string;
  aadharNo: string;
  sex: string;
  dob: string;
  address: string;
  groundClasses: string;
  simulationClasses: string;
  flyingTraining: string;
  dateOfIssue: string;
  orientation: 'portrait' | 'landscape';
  type: 'offline' | 'online';
  signatureMode: 1 | 2 | 3;
  uin: string;
}