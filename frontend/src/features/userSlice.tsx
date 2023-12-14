import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from '../config/Config';
import UserLogin from "../models/userModel";

interface UserState {
  isAuthenticated: boolean;
  loading: boolean,
  status: string,
  message: string,
  token: string,
}
  
const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  status: "",
  message: "",
  token: localStorage.getItem("user") || "",
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: object, thunkApi) => {
    try {
      const request = await axios.post<UserLogin>(`${baseUrl}/api/users/signin`, data)
      console.log(request)
      const response = request.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      return response;
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      initializeStateFromLocalStorage: (state, action: PayloadAction<string>) => {
        if (action.payload) {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          state.status = "success";
          state.message = "You are already logged in"
        }
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          return { ...state, loading: true, message: "pending" };
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
          if (action.payload) {
            const data = action.payload;
            
            return {
              ...state,
              isAuthenticated: true,
              message: data.message,
              token: data.data,
              status: "success",
              loading: false,
            }
          }
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
          const data = action.payload;
          console.log(`rejected data = ${data}`)
          return {
            ...state, message: data.message, status: "rejected"
          }
        })
    }
})

export const { initializeStateFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;