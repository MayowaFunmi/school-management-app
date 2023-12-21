// import axios, { AxiosRequestConfig } from "axios";
// import { baseUrl } from "../config/Config";

// interface Data {
//     _id: object,
//     roleName: string,
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }
// interface Role {
//     message: string,
//     data: Data[]
// }

// interface Props {
//     roleIds: string[];
// }

// export const isAdminRole = async ({ roleIds }: Props, rolesEndpoint: string, token: string): Promise<boolean> => {
//     try {
//         const axiosConfig: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }
//         const response = await axios.get<Role>(rolesEndpoint, axiosConfig);
//         const roles = response.data.data;

//         const isAdminRoleExists = roles.some((role) => roleIds.includes(role._id.toString()) && (role.roleName === "ADMIN" || role.roleName === "OWNER") );
//         return isAdminRoleExists;
//     } catch (error) {
//         return false;
//     }
// }

// export const isSuperAdminRole = async ({ roleIds }: Props, rolesEndpoint: string, token: string): Promise<boolean> => {
//     try {
//         const axiosConfig: AxiosRequestConfig ={
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }
//         const response = await axios.get<Role>(rolesEndpoint, axiosConfig);
//         const roles = response.data.data;

//         const isSuperAdminRole = roles.some((role) => roleIds.includes(role._id.toString()) && (role.roleName === "SUPER ADMIN" || role.roleName === "OWNER") );
//         return isSuperAdminRole;
//     } catch (error) {
//         return false;
//     }
// }

// export const isOwnerRole = async ({ roleIds }: Props, rolesEndpoint: string, token: string): Promise<boolean> => {
//     try {
//         const axiosConfig: AxiosRequestConfig ={
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }
//         const response = await axios.get<Role>(rolesEndpoint, axiosConfig);
//         const roles = response.data.data;

//         const isOwnerRole = roles.some((role) => roleIds.includes(role._id.toString()) && role.roleName === "OWNER" );
//         return isOwnerRole;
//     } catch (error) {
//         return false;
//     }
// }

// export const checkAdminRole = async (token: string, rolesIds: string[]) => {
//     const rolesApiEndpoint = `${baseUrl}/api/roles/show-all-roles`;
//     const axiosConfig: AxiosRequestConfig = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     }

//     try {
//         const response = await axios.get<Role>(rolesApiEndpoint, axiosConfig);
//         const allRoles = response.data.data;

//         const isAdmin = allRoles.some((role) => 
//             rolesIds.includes(role._id.toString()) &&
//             (role.roleName === "ADMIN" || role.roleName === "OWNER")
//         );
//     } catch (error) {
        
//     }
// }
export {}