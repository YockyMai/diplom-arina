import axios from "../core/axios";
import { IService } from "../types/objects/service";

export const ServiceApi = {
  getAll() {
    return axios.get<IService[]>("/service/getAll");
  },
  getOne(id: number) {
    return axios.get<IService>(`/service/${id}`);
  },
};
