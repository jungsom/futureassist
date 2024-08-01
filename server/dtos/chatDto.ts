import { IsString, IsInt } from 'class-validator';

export class CreateChatDTO {
  @IsString()
  public disease: string;

  @IsString()
  public department: string;

  @IsInt()
  public user_id: number;
}