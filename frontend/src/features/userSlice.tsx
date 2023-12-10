import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from '../config/Config';
import UserLogin from "../models/userModel";

interface UserState {
    isAuthenticated: boolean;
    loading: boolean,
    status: string,
    message: string,
    token: string,
    username: string,
    password: string
}

interface LoginCredentials {
  username: string;
  password: string;
}
  
const initialState: UserState = {
    isAuthenticated: false,
    loading: false,
    status: "",
    message: "",
    token: "",
    username: "",
    password: ""
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: object, thunkApi) => {
    try {
      const request = await axios.post<UserLogin>(`http://localhost:5000/api/users/signin`, data)
      const response = request.data.data;
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

// export const loginUser = createAsyncThunk(
//     'user/loginUser',
//     async(userCredentials: LoginCredentials, { getState, rejectWithValue }) => {
//       console.log("get state = ", getState());
//         try {
//             const request = await axios.post(`${baseUrl}/users/login`, userCredentials)
//             const response = await request.data.data;
//             localStorage.setItem("user", JSON.stringify(response));
//             return response;
//         } catch (error: any) {
//             console.error(error);
//         return rejectWithValue({ message: error.response });
//         }
//     }
// )

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          return { ...state, loading: true, message: "pending" };
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
          if (action.payload) {
            const data = action.payload;
            console.log('data = ', data.count);
            return {
              ...state,
              isAuthenticated: true,
              message: data.message,
              token: data.data,
              status: "success"
            }
          }
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
          const data = action.payload;
          return {
            ...state, message: data.message, status: "rejected"
          }
        })
    }
})

export default userSlice.reducer;