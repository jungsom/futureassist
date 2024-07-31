import { datasource } from '../config/db';
import {
  SearchHospitalDTO,
  LocationDTO,
  HospitalDetailDTO
} from '../dtos/hospitalDto';
import { IHospital } from '../models/hospitalModel';

/** 시도 데이터 조회 리포지토리 */
export const getSidoAddrRepository = async (): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT sido_addr FROM hospital`
  );
  return result.map((row: { sido_addr: string }) => row.sido_addr);
};

/** 시구 데이터 조회 리포지토리 */
export const getSiguAddrRepository = async (
  sido_addr: string
): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT sigu_addr FROM hospital WHERE sido_addr = $1`,
    [sido_addr]
  );
  return result.map((row: { sigu_addr: string }) => row.sigu_addr);
};

/** 동 데이터 조회 리포지토리 */
export const getDongAddrRepository = async (
  sido_addr: string,
  sigu_addr: string
): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT dong_addr FROM hospital WHERE sido_addr = $1 AND sigu_addr = $2`,
    [sido_addr, sigu_addr]
  );
  return result.map((row: { dong_addr: string }) => row.dong_addr);
};

/** 진료과명 조회 리포지토리 */
export const getSpecialityRepository = async (): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT department FROM hospital_speciality`
  );
  return result.map((row: { department: string }) => row.department);
};

/** 지역명 선택 기반 병원 검색 리포지토리 */
export const searchHospitalsRepository = async (
  searchParams: SearchHospitalDTO
): Promise<{ result: IHospital[]; total: number }> => {
  const {
    sido_addr,
    sigu_addr,
    dong_addr,
    name,
    department,
    pageSize = 5,
    nextCursor
  } = searchParams;

  let query = `
    SELECT h.hospital_id, h.name, h.type, h.telno, h.url, h.addr, h.sido_addr, h.sigu_addr, h.dong_addr, h.x_pos, h.y_pos, 
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', d.id, 'device_name', d.device_name, 'device_cnt', d.device_cnt))
        FILTER (WHERE d.device_name IS NOT NULL), '{}'::jsonb[]) AS medical_devices, 
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', s.id, 'department', s.department, 'specialist_cnt', s.specialist_cnt))
        FILTER (WHERE s.department IS NOT NULL), '{}'::jsonb[]) AS specialities
    FROM hospital h
    LEFT JOIN medical_device d ON h.hospital_id = d.hospital_id
    LEFT JOIN hospital_speciality s ON h.hospital_id = s.hospital_id
    WHERE 1=1
  `;
  const params: any[] = [];
  let paramIndex = 1;

  if (sido_addr) {
    query += ` AND h.sido_addr = $${paramIndex++}`;
    params.push(sido_addr);
  }
  if (sigu_addr) {
    query += ` AND h.sigu_addr = $${paramIndex++}`;
    params.push(sigu_addr);
  }
  if (dong_addr) {
    query += ` AND h.dong_addr = $${paramIndex++}`;
    params.push(dong_addr);
  }
  if (name) {
    query += ` AND h.name LIKE $${paramIndex++}`;
    params.push(`%${name}%`);
  }
  if (department) {
    query += ` AND s.department = $${paramIndex++}`;
    params.push(department);
  }
  if (nextCursor) {
    const [nextCursorName, nextCursorId] = nextCursor.split('_');
    query += ` AND (h.name, h.hospital_id) > ($${paramIndex++}, $${paramIndex++})`;
    params.push(nextCursorName, nextCursorId);
  }

  query += ` GROUP BY h.hospital_id ORDER BY h.name, h.hospital_id LIMIT $${paramIndex++}`;
  params.push(pageSize);

  const result = await datasource.query(query, params);

  let countQuery = `
    SELECT COUNT(DISTINCT h.hospital_id) as total
    FROM hospital h
    LEFT JOIN medical_device d ON h.hospital_id = d.hospital_id
    LEFT JOIN hospital_speciality s ON h.hospital_id = s.hospital_id
    WHERE 1=1
  `;

  const countParams: any[] = [];
  let countParamIndex = 1;

  if (sido_addr) {
    countQuery += ` AND h.sido_addr = $${countParamIndex++}`;
    countParams.push(sido_addr);
  }
  if (sigu_addr) {
    countQuery += ` AND h.sigu_addr = $${countParamIndex++}`;
    countParams.push(sigu_addr);
  }
  if (dong_addr) {
    countQuery += ` AND h.dong_addr = $${countParamIndex++}`;
    countParams.push(dong_addr);
  }
  if (name) {
    countQuery += ` AND h.name LIKE $${countParamIndex++}`;
    countParams.push(`%${name}%`);
  }
  if (department) {
    countQuery += ` AND s.department = $${countParamIndex++}`;
    countParams.push(department);
  }

  const countResult = await datasource.query(countQuery, countParams);

  return { result, total: countResult[0].total };
};

/** 위치 기반 병원 검색 리포지토리 */
export const searchHospitalsByLocationRepository = async (
  locationParams: LocationDTO
): Promise<{ result: IHospital[]; total: number }> => {
  const {
    longitude,
    latitude,
    radius = 5000,
    department,
    pageSize = 5,
    nextCursor
  } = locationParams;

  let query = `
    SELECT h.hospital_id, h.name, h.type, h.telno, h.url, h.addr, h.sido_addr, h.sigu_addr, h.dong_addr, h.x_pos, h.y_pos,
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', d.id, 'device_name', d.device_name, 'device_cnt', d.device_cnt))
        FILTER (WHERE d.device_name IS NOT NULL), '{}'::jsonb[]) AS medical_devices, 
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', s.id, 'department', s.department, 'specialist_cnt', s.specialist_cnt))
        FILTER (WHERE s.department IS NOT NULL), '{}'::jsonb[]) AS specialities,
      ST_Distance(h.geom::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS distance
    FROM hospital h
    LEFT JOIN medical_device d ON h.hospital_id = d.hospital_id
    LEFT JOIN hospital_speciality s ON h.hospital_id = s.hospital_id
    WHERE ST_DWithin(h.geom::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)
  `;

  const params: any[] = [longitude, latitude, radius];
  let paramIndex = 4;

  if (department) {
    query += ` AND s.department = $${paramIndex++}`;
    params.push(department);
  }
  if (nextCursor) {
    const [nextCursorDistance, nextCursorId] = nextCursor.split('_');
    query += ` AND (ST_Distance(h.geom::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography), h.hospital_id) > ($${paramIndex++}, $${paramIndex++})`;
    params.push(parseFloat(nextCursorDistance), nextCursorId);
  }

  query += ` GROUP BY h.hospital_id ORDER BY distance, h.hospital_id LIMIT $${paramIndex++}`;
  params.push(pageSize);

  const result = await datasource.query(query, params);

  let countQuery = `
    SELECT COUNT(DISTINCT h.hospital_id) as total
    FROM hospital h
    LEFT JOIN medical_device d ON h.hospital_id = d.hospital_id
    LEFT JOIN hospital_speciality s ON h.hospital_id = s.hospital_id
    WHERE ST_DWithin(h.geom::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)
  `;

  const countParams: any[] = [longitude, latitude, radius];
  let countParamIndex = 4;

  if (department) {
    countQuery += ` AND s.department = $${countParamIndex++}`;
    countParams.push(department);
  }

  const countResult = await datasource.query(countQuery, countParams);

  return { result, total: countResult[0].total };
};

/** 특정 병원 데이터 조회 리포지토리 */
export const getHospitalDetailsRepository = async (
  searchParams: HospitalDetailDTO
): Promise<IHospital[]> => {
  const query = `
    SELECT h.hospital_id, h.name, h.type, h.telno, h.url, h.addr, h.sido_addr, h.sigu_addr, h.dong_addr, h.x_pos, h.y_pos, 
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', d.id, 'device_name', d.device_name, 'device_cnt', d.device_cnt))
        FILTER (WHERE d.device_name IS NOT NULL), '{}'::jsonb[]) AS medical_devices, 
      COALESCE(array_agg(DISTINCT jsonb_build_object('id', s.id, 'department', s.department, 'specialist_cnt', s.specialist_cnt))
        FILTER (WHERE s.department IS NOT NULL), '{}'::jsonb[]) AS specialities
    FROM hospital h
    LEFT JOIN medical_device d ON h.hospital_id = d.hospital_id
    LEFT JOIN hospital_speciality s ON h.hospital_id = s.hospital_id
    WHERE h.hospital_id = $1
    GROUP BY h.hospital_id
  `;
  const params = [searchParams.hospital_id];

  const result = await datasource.query(query, params);
  return result;
};
