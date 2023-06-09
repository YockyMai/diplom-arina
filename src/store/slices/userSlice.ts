import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { postUserData } from "../../types/api/user";
import jwt_decode from "jwt-decode";
import { IUser } from "../../types/objects/user";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import axios from "../../core/axios";

export interface UserState {
  currentStep: number;
  registerInProgress: boolean;
  loginInProgress: boolean;
  user: IUser;
  isAuth: boolean;
}

const initialState: UserState = {
  currentStep: 0,
  registerInProgress: false,
  loginInProgress: false,
  user: {} as IUser,
  isAuth: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (
    { email, password, username, phone }: postUserData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/user/registration", {
        email,
        password,
        username,
        phone: phone
          .replace("+", "")
          .replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(/ /g, ""),
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message);
    }
  }
);

export const check = createAsyncThunk(
  "user/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/auth");

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("token", response.data);
      const user: IUser = jwt_decode(response.data);

      return user;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = {} as IUser;
      localStorage.removeItem("token");
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.registerInProgress = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.data.token);
      const user: IUser = jwt_decode(action.payload?.data.token);

      state.user = user;
      state.isAuth = true;
      state.registerInProgress = false;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      showNotification({
        title: "Ошибка при регистрации",
        message: action.payload,
      });
      state.isAuth = false;
      state.registerInProgress = false;
    });

    builder.addCase(login.pending, (state) => {
      state.loginInProgress = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.data.token);
      const user: IUser = jwt_decode(action.payload?.data.token);
      state.user = user;
      state.isAuth = true;
      state.loginInProgress = false;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      showNotification({
        title: "Ошибка при авторизации",
        message: action.payload,
      });
      state.isAuth = false;
      state.user = {} as IUser;
      state.loginInProgress = false;
      localStorage.removeItem("token");
    });

    builder.addCase(check.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.registerInProgress = false;
    });
    builder.addCase(check.rejected, (state) => {
      state.user = {} as IUser;
      localStorage.removeItem("token");
      state.isAuth = false;
    });
  },
});
export const { signOut } = userSlice.actions;
export default userSlice.reducer;
