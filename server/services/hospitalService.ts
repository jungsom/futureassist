import {
  getSidoAddrRepository,
  getSiguAddrRepository,
  getDongAddrRepository,
  searchHospitalsRepository,
  getHospitalDetailsRepository,
} from '../repositories/hospitalRepository';
import { SearchHospitalDTO, HospitalDetailDTO } from '../dtos/hospitalDto';
import { IHospital } from '../models/hospitalModel';

/** 시도 데이터 조회 서비스 */
export async function getSidoAddr(): Promise<string[]> {
  const result = await getSidoAddrRepository();
  return result.sort((a, b) => a.localeCompare(b));
}

/** 시구 데이터 조회 서비스 */
export async function getSiguAddr(sido_addr: string): Promise<string[]> {
  const result = await getSiguAddrRepository(sido_addr);
  return result.sort((a, b) => a.localeCompare(b));
}

/** 동 데이터 조회 서비스 */
export async function getDongAddr(
  sido_addr: string,
  sigu_addr: string
): Promise<string[]> {
  const result = await getDongAddrRepository(sido_addr, sigu_addr);
  return result.sort((a, b) => a.localeCompare(b));
}

/** 포맷팅 함수 */
function formatHospitalData(result: any[]): IHospital[] {
  return result.map((row) => ({
    hospital_id: row.hospital_id,
    name: row.name,
    type: row.type,
    telno: row.telno,
    url: row.url,
    addr: row.addr,
    sido_addr: row.sido_addr,
    sigu_addr: row.sigu_addr,
    dong_addr: row.dong_addr,
    x_pos: row.x_pos,
    y_pos: row.y_pos,
    medicalDevices: result
      .filter(
        (device) => device.hospital_id === row.hospital_id && device.device_name
      )
      .map((device) => ({
        id: device.device_id,
        device_name: device.device_name,
        device_cnt: device.device_cnt,
      })),
    specialities: result
      .filter(
        (speciality) =>
          speciality.hospital_id === row.hospital_id && speciality.department
      )
      .map((speciality) => ({
        id: speciality.speciality_id,
        department: speciality.department,
        specialist_cnt: speciality.specialist_cnt,
      })),
  }));
}

/** 지역명 선택 기반 병원 검색 서비스 */
export async function searchHospitals(
  searchParams: SearchHospitalDTO
): Promise<{
  data: IHospital[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const result = await searchHospitalsRepository(searchParams);

  // 결과 포맷팅
  const data: IHospital[] = formatHospitalData(result);

  const total = result.length;
  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 5;

  return { data, total, page, pageSize };
}

/** 특정 병원 데이터 조회 서비스 */
export async function getHospitalDetails(
  searchParams: HospitalDetailDTO
): Promise<IHospital> {
  const result = await getHospitalDetailsRepository(searchParams);

  // 결과 포맷팅
  const data: IHospital[] = formatHospitalData(result);

  if (data.length === 0) {
    throw new Error('Hospital not found');
  }

  return data[0];
}
