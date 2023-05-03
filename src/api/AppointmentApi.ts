import axios from "../core/axios";

export const AppointmentApi = {
  create(serviceId: number, date: Date, userId: number) {
    return axios.post("/appointment/create", {
      serviceId,
      date,
      userId,
    });
  },
  getAllForUser() {
    return axios.get("/appointment/getAllForUser");
  },
  getAllForMaster() {
    return axios.get("/appointment/getAllForMaster");
  },
  cancel(appointmentId: number) {
    return axios.post("/appointment/cancel", { appointmentId });
  },
};
