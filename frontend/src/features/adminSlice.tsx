import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config/Config";
import axios, { AxiosRequestConfig } from "axios";

interface Users {
	_id: string
	username: string
	firstName: string
	lastName: string
	email: string
	roles: { roleName: string }[]
	uniqueId: string
	createdAt: string
}

interface Roles {
	roles: { _id: string, roleName: string}[]
}

interface Data {
    loading: boolean
    status: string
	data: Users
	roles: Roles
	roleMsg: string
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
  roles: {
    roles: [],
  },
  roleMsg: ""
};

interface Values { userId: string, roleName: string }

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

export const addRoleToUser = createAsyncThunk(
	'admin/addRoleToUser',
	async (values: Values, thunkApi) => {
		const token = localStorage.getItem("user");
		try {
			const axiosConfig: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			};
			const response = await axios.post(`${baseUrl}/api/roles/add-role-to-user`, values, axiosConfig)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

export const removeRoleFromUser = createAsyncThunk(
	'admin/removeRoleFromUser',
	async (values: Values, thunkApi) => {
		const token = localStorage.getItem("user");
		try {
			const axiosConfig: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			};
			const response = await axios.post(`${baseUrl}/api/roles/remove-role-from-user`, values, axiosConfig)
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
)

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
		builder
			.addCase(addRoleToUser.pending, (state) => {
				return { ...state, }
			})
			.addCase(addRoleToUser.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
			.addCase(addRoleToUser.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})

		builder
			.addCase(removeRoleFromUser.pending, (state) => {
				return { ...state, }
			})
			.addCase(removeRoleFromUser.fulfilled, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
			.addCase(removeRoleFromUser.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload) {
					const dataMsg = action.payload;
					return {
						...state, roleMsg: dataMsg.message
					}
				}
			})
	}
})

export default adminSlice.reducer;