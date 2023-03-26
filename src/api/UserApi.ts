import axios from "../core/axios";
import { IUser } from "../types/objects/user";

export const UserApi = {
  findAll() {
    return axios.get<{ users: IUser[] }>("/user/findAll");
  },
  findMasters() {
    return axios.get<{ users: IUser[] }>("/user/findMasters");
  },
  changeRole(id: string, role: string) {
    return axios.post<{ users: IUser[] }>("/user/changeRole", { id, role });
  },
};
