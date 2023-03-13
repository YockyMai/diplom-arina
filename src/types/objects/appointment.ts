import { IUser } from "./user";
import { IService } from "./service";

export interface IAppointment {
  id: 1;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: 2;
  serviceId: 2;
  user: IUser;
  service: IService;
}
