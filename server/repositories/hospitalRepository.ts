import { datasource } from '../config/db';
import { SearchHospitalDTO } from '../dtos/hospitalDto';

export const getSidoAddrRepository = async (): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT sido_addr FROM hospital`
  );
  return result.map((row: { sido_addr: string }) => row.sido_addr);
};

export const getSiguAddrRepository = async (
  sido_addr: string
): Promise<string[]> => {
  const result = await datasource.query(
    `SELECT DISTINCT sigu_addr FROM hospital WHERE sido_addr = $1`,
    [sido_addr]
  );
  return result.map((row: { sigu_addr: string }) => row.sigu_addr);
};

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

export const searchHospitalsRepository = async (
  searchParams: SearchHospitalDTO
): Promise<any[]> => {
  const {
    sido_addr,
    sigu_addr,
    dong_addr,
    name,
    department,
    page = 1,
    pageSize = 5,
  } = searchParams;

  let query = `
      SELECT h.hospital_id, h.name, h.type, h.telno, h.url, h.addr, h.sido_addr, h.sigu_addr, h.dong_addr, h.x_pos, h.y_pos, 
             d.id as device_id, d.device_name, d.device_cnt, 
             s.id as speciality_id, s.department, s.specialist_cnt
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
    query += ` AND h.name ILIKE $${paramIndex++}`;
    params.push(`%${name}%`);
  }
  if (department) {
    query += ` AND s.department ILIKE $${paramIndex++}`;
    params.push(`%${department}%`);
  }

  query += ` ORDER BY h.name LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
  params.push(pageSize, (page - 1) * pageSize);

  const result = await datasource.query(query, params);
  return result;
};
