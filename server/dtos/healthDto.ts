import { IsInt } from 'class-validator';
import { HealthRecords } from '../entities/HealthRecord';

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

  public toEntity(userId: number): HealthRecords {
    const health = new HealthRecords();
    health.user_id = userId;
    health.height = this.height;
    health.weight = this.weight;
    health.bloodsugar = this.bloodsugar;
    health.bloodpressure = this.bloodpressure;
    health.cholesterol = this.cholesterol;
    return health;
  }
}
