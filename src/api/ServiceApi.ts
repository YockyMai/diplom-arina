import axios from "../core/axios";
import { IService } from "../types/objects/service";

export const ServiceApi = {
  getAll() {
    return axios.get<IService[]>("/service/getAll");
  },
  getOne(id: number) {
    return axios.get<IService>(`/service/${id}`);
  },
  create(formData: FormData) {
    return axios.post("/service/create", formData);
  },
  edit(body: any) {
    return axios.post("/service/edit", body);
  },
  delete(id: string) {
    return axios.delete(`/service/delete/${id}`);
  },
};
