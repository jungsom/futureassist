import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMaxSize,
  IsInt
} from 'class-validator';
import { Transform } from 'class-transformer';

export class BoardDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, { message: '해시태그는 최대 5개까지 가능합니다.' })
  @IsString({ each: true, message: '해시태그는 문자열이어야 합니다.' })
  hashtag?: string[];
}

export class BoardIdDTO {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  board_id: number;
}

export class BoardPaginationDTO {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  pageSize?: number = 10;
}

export class TagSearchDTO extends BoardPaginationDTO {
  @IsNotEmpty()
  @IsString()
  tag: string;
}
