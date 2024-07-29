import {
  getSidoAddrRepository,
  getSiguAddrRepository,
  getDongAddrRepository,
  searchHospitalsRepository,
  getHospitalDetailsRepository
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
  const filteredResult = result.filter((dong) => dong !== null);
  return filteredResult.sort((a, b) => a.localeCompare(b));
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

  const total = result.length;
  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 5;

  return { data: result, total, page, pageSize };
}

/** 특정 병원 데이터 조회 서비스 */
export async function getHospitalDetails(
  searchParams: HospitalDetailDTO
): Promise<IHospital> {
  const result = await getHospitalDetailsRepository(searchParams);

  if (result.length === 0) {
    throw new Error('Hospital not found');
  }

  return result[0];
}
