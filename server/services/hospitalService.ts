import {
  getSidoAddrRepository,
  getSiguAddrRepository,
  getDongAddrRepository,
  getSpecialityRepository,
  searchHospitalsRepository,
  searchHospitalsByLocationRepository,
  getHospitalDetailsRepository
} from '../repositories/hospitalRepository';
import {
  SearchHospitalDTO,
  LocationDTO,
  HospitalDetailDTO
} from '../dtos/hospitalDto';
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

/** 진료과명 조회 서비스 */
export async function getSpecialities(): Promise<string[]> {
  const result = await getSpecialityRepository();
  return result.sort((a, b) => a.localeCompare(b));
}

/** 지역명 선택 기반 병원 검색 서비스 */
export async function searchHospitals(
  searchParams: SearchHospitalDTO
): Promise<{
  data: IHospital[];
  total: number;
  nextCursor: string | null;
}> {
  const { result, total } = await searchHospitalsRepository(searchParams);

  const nextCursorValue =
    result.length === searchParams.pageSize
      ? `${result[result.length - 1].name}_${result[result.length - 1].hospital_id}`
      : null;

  return { data: result, total, nextCursor: nextCursorValue };
}

/** 위치 기반 병원 검색 서비스 */
export async function searchHospitalsByLocation(
  locationParams: LocationDTO
): Promise<{
  data: IHospital[];
  total: number;
  nextCursor: string | null;
}> {
  const { result, total } =
    await searchHospitalsByLocationRepository(locationParams);

  const nextCursorValue =
    result.length === locationParams.pageSize
      ? `${result[result.length - 1].distance}_${result[result.length - 1].hospital_id}`
      : null;

  return { data: result, total, nextCursor: nextCursorValue };
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
