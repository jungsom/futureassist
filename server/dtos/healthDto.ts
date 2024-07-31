import { IsInt, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class healthRecordDto {
  @IsInt()
  public height: number; //cm

  @IsInt()
  public weight: number; //kg

  @IsInt()
  public bloodsugar: number; //mg/dL

  @IsInt()
  public bloodpressure: number; //mmHg

  @IsInt()
  public cholesterol: number; //mg/dL
}
