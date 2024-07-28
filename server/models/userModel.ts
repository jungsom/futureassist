export interface Iuser {
  name: string;
  password: string;
  email: string;
  birth_year: number;
}

export interface IuserLogin {
  password: string;
  email: string;
}
