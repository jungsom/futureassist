import {
  IsNotEmpty,
  Matches,
  IsInt,
  Length,
  IsEmail,
  Min,
  Max,
  IsOptional,
  IsDate
} from 'class-validator';

export class registerDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/, {
    message: "비밀번호는 최소 8~12자, 문자, 숫자, 특수문자를 포함해야 합니다.'"
  })
  public password: string;

  @IsNotEmpty()
  @Length(1, 4)
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2010)
  public birth_year: number;

  public deletedAt?: Date;
}

export class loginDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(8)
  public password: string;
  public deletedAt?: Date;
}

export class userDto {
  public user_id: number;
  public email: string;
  public name: string;
  public password: string;
  public birth_year: number;
  public deletedAt?: Date;
}
