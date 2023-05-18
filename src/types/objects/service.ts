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
  calendars: Calendar[];
}

export type Calendar = {
  id: number;
  day: string;
  createdAt: string;
  updatedAt: string;
  calendarId: number;
  days: Day[];
};

export type Day = {
  id: number;
  day: string;
  createdAt: string;
  updatedAt: string;
  calendarId: number;
  times: Time[];
};

export type Time = {
  id: number;
  time: string;
  createdAt: string;
  updatedAt: string;
  dayId: number;
};
