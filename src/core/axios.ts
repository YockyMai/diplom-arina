import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7070/api/",
});

interface myAxiosHeaders extends AxiosRequestHeaders {
  authorization: string;
}

instance.interceptors.request.use((config) => {
  (
    config.headers as myAxiosHeaders
  ).authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default instance;
