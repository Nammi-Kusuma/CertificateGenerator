export interface CertificateData {
  name: string;
  certificateNo: string;
  aadharNo: string;
  sex: string;
  dob: string;
  address: string;
  groundClasses: string;
  groundClassesFrom: string;
  groundClassesTo: string;
  simulationClasses: string;
  simulationClassesFrom: string;
  simulationClassesTo: string;
  flyingTraining: string;
  flyingTrainingFrom: string;
  flyingTrainingTo: string;
  dateOfIssue: string;
  orientation: 'portrait' | 'landscape';
  type: 'offline' | 'online';
  trainerSignature: 'dev' | 'vamsi' | 'sumith';
  uin: string;
}