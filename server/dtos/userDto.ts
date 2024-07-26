import {
  IsNotEmpty,
  Matches,
  IsInt,
  Length,
  IsEmail,
  Min,
  Max
} from 'class-validator';

export class registerDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/, {
    message:
      "비밀번호는 최소 8자 이상, 문자, 숫자, 특수문자를 포함해야 합니다.'"
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
}

export class loginDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(8)
  public password: string;
}
