import {
  getSidoAddrRepository,
  getSiguAddrRepository,
  getDongAddrRepository,
  getSpecialityRepository,
  searchHospitalsRepository,
  searchHospitalsByLocationRepository,
  getHospitalDetailsRepository,
  saveHospitalRecordRepository,
  deleteHospitalRecordRepository,
  getHospitalRecordsByUserIdRepository,
  getHospitalRecordCountByUserId,
  getHospitalRecordByUserIdAndHospitalId
} from '../repositories/hospitalRepository';
import {
  SearchHospitalDTO,
  LocationDTO,
  HospitalIdDTO
} from '../dtos/hospitalDto';
import { HospitalRecord } from '../entities/HospitalRecord';
import { IHospital } from '../models/hospitalModel';
import { BadRequest } from '../middlewares/error';
import { formatDateToMinute } from './utils';

/** 시도 데이터 조회 서비스 */
const sidoOrder = [
  '서울',
  '부산',
  '인천',
  '대구',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종시'
];

export async function getSidoAddr(): Promise<string[]> {
  const result = await getSidoAddrRepository();
  return result.sort((a, b) => sidoOrder.indexOf(a) - sidoOrder.indexOf(b));
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
  searchParams: HospitalIdDTO
): Promise<IHospital> {
  const result = await getHospitalDetailsRepository(searchParams);

  if (result.length === 0) {
    throw new Error('Hospital not found');
  }

  return result[0];
}

/** 병원 정보 저장 서비스 */
export const saveHospital = async (userId: number, dto: HospitalIdDTO) => {
  const existingRecordCount = await getHospitalRecordCountByUserId(userId);
  if (existingRecordCount >= 5) {
    throw new BadRequest('최대 5개의 병원만 저장할 수 있습니다.');
  }

  const existingRecord = await getHospitalRecordByUserIdAndHospitalId(
    userId,
    dto.hospital_id
  );
  if (existingRecord) {
    throw new BadRequest('이미 저장된 병원입니다.');
  }

  const hospital = await getHospitalDetailsRepository(dto);

  if (!hospital) {
    throw new BadRequest('해당 병원을 찾을 수 없습니다.');
  }

  const hospitalRecord = new HospitalRecord();
  hospitalRecord.user_id = userId;
  hospitalRecord.hospital_id = dto.hospital_id;

  try {
    await saveHospitalRecordRepository(hospitalRecord);
    return { message: '병원 정보가 저장되었습니다.' };
  } catch (err) {
    throw new Error(`병원 저장 중 오류가 발생했습니다.`);
  }
};

/** 병원 정보 삭제 서비스 */
export const deleteHospital = async (userId: number, dto: HospitalIdDTO) => {
  const hospital = await getHospitalDetailsRepository(dto);

  if (!hospital) {
    throw new BadRequest('해당 병원을 찾을 수 없습니다.');
  }

  const existingRecord = await getHospitalRecordByUserIdAndHospitalId(
    userId,
    dto.hospital_id
  );
  if (!existingRecord) {
    throw new BadRequest('삭제할 해당 병원 기록이 없습니다.');
  }

  try {
    await deleteHospitalRecordRepository(userId, dto.hospital_id);
    return { message: '병원 정보가 삭제되었습니다.' };
  } catch (err) {
    throw new Error(`병원 삭제 중 오류가 발생했습니다.`);
  }
};

/** 병원 기록 조회 서비스 */
export const getHospitalRecordsByUserId = async (userId: number) => {
  const records = await getHospitalRecordsByUserIdRepository(userId);

  if (records.length === 0) {
    throw new BadRequest('저장된 병원 기록이 없습니다.');
  }

  return records.map((record) => ({
    ...record,
    createdAt: formatDateToMinute(new Date(record.createdAt))
  }));
};
