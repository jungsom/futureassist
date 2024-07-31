export interface Ihealth {
  height: number; //cm
  weight: number; //kg
  bloodsugar: number; //mg/dL
  bloodpressure: number; //mmHg
  cholesterol: number; //mg/dL
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
