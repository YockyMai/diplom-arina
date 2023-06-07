import axios from "../core/axios";
import { IService } from "../types/objects/service";

export enum CategoriesVariants {
  eyelashes = "Ресницы",
  pedicure = "Педикюр",
  brows = "Брови",
  manicure = "Маникюр",
}

export const ServiceApi = {
  getAll(category?: string) {
    return axios.get<IService[]>("/service/getAll", { params: category });
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
