import { Length, IsNotEmpty } from 'class-validator';

export class commentDTO {
  @IsNotEmpty()
  @Length(1, 100, {
    message: '댓글은 1~100자 이내로 작성 가능합니다.'
  })
  public content: string;
}
