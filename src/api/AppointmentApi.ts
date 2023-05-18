import axios from "../core/axios";

export const AppointmentApi = {
  create(serviceId: number, dayId: number, timeId: number, userId: number) {
    return axios.post("/appointment/create", {
      serviceId,
      dayId,
      timeId,
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
