import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsInt
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SidoDTO {
  @IsString()
  @IsNotEmpty()
  sido_addr: string;
}

export class SiguDTO {
  @IsString()
  @IsNotEmpty()
  sido_addr: string;

  @IsString()
  @IsNotEmpty()
  sigu_addr: string;
}

export class SearchHospitalDTO {
  @IsOptional()
  @IsString()
  sido_addr?: string;

  @IsOptional()
  @IsString()
  sigu_addr?: string;

  @IsOptional()
  @IsString()
  dong_addr?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  pageSize?: number = 5;
}

export class LocationDTO {
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  radius?: number = 5000; // 기본 반경 5km

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  pageSize?: number = 5;
}

export class HospitalDetailDTO {
  @IsString()
  @IsNotEmpty()
  hospital_id: string;
}
