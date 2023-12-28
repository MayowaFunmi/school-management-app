import { AxiosRequestConfig } from "axios";

export const baseUrl = "http://localhost:5000";
export const jwtKey = "this is a secret key for jsonwebtoken";
const token = localStorage.getItem("user");
export const axiosConfig: AxiosRequestConfig = {
    headers: {
        Authorization: `Bearer ${token}`,
    }
};
