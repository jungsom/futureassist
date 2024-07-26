export interface Iuser {
  user_id: number;
  name: string;
  password: string;
  email: string;
  birth_year: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IuserRegister {
  name: string;
  password: string;
  email: string;
  birth_year: number;
}

export interface IuserLogin {
  password: string;
  email: string;
}
