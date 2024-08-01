import { User } from '../entities/User';

export interface Iuser {
  user_id: User | number;
  name: string;
  password: string;
  email: string;
  birth_year: number;
}
