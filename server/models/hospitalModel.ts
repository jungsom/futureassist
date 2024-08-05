export interface IHospital {
  hospital_id: string;
  name: string;
  type: string;
  telno?: string;
  url?: string;
  addr: string;
  sido_addr: string;
  sigu_addr: string;
  dong_addr?: string;
  x_pos?: number;
  y_pos?: number;
  medical_devices: IMedicalDevice[];
  specialities: IHospitalSpeciality[];
  distance?: number;
}

export interface IMedicalDevice {
  id: number;
  device_name: string;
  device_cnt: number;
}

export interface IHospitalSpeciality {
  id: number;
  department: string;
  specialist_cnt: number;
}

export interface IHospitalRecord {
  hospital_id: string;
  name: string;
  type: string;
  telno?: string;
  url?: string;
  addr: string;
  sido_addr: string;
  sigu_addr: string;
  dong_addr?: string;
  x_pos?: number;
  y_pos?: number;
  createdAt: string;
}
