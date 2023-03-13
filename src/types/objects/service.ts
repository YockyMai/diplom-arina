import { IUser } from "./user";

export interface IService {
  id: number;
  name: string;
  price: string;
  description: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
  userId: 3;
  user: IUser;
}
