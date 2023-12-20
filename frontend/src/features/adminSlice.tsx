import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config/Config";
import axios, { AxiosRequestConfig } from "axios";

interface Users {
	_id: string
	username: string
	firstName: string
	lastName: string
	email: string
	roles: { roleName: string }[];
	uniqueId: string
	createdAt: string
}

interface Data {
    loading: boolean
    status: string
		data: Users
}

const initialState: Data = {
  loading: false,
  status: "",
  data: {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    uniqueId: "",
    createdAt: "",
  },
};

export const getUserDetails = createAsyncThunk(
    'admin/getUserDetails',
    async (data: string, thunkApi) => {
      try {
        const token = localStorage.getItem("user");
        const endpoint = `${baseUrl}/api/users/get-user-by-unique-id?uniqueId=${data}`;
        const axiosConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(endpoint, axiosConfig);
        return response.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserDetails.pending, (state) => {
				return { ...state, loading: true, status: "pending" }
			})
			.addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataRes = action.payload;

					return {
						...state, loading: false, data: dataRes.data, status: "success"
					}
				}
			})
			.addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataRes = action.payload;

					return {
						...state, loading: false, message: dataRes.message, status: "rejected"
					}
				}
			})
	}
})

export default adminSlice.reducer;