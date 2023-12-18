import axios, { AxiosRequestConfig } from "axios";

interface Data {
    _id: object,
    roleName: string,
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface Role {
    message: string,
    data: Data[]
}

interface Props {
    roleIds: string[];
}

export const isAdminRole = async ({ roleIds }: Props, rolesEndpoint: string, token: string): Promise<boolean> => {
    try {
        const axiosConfig: AxiosRequestConfig ={
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get<Role>(rolesEndpoint, axiosConfig);
        const roles = response.data.data;

        const isAdminRoleExists = roles.some((role) => roleIds.includes(role._id.toString()) && (role.roleName === "ADMIN" || role.roleName === "OWNER") );
        return isAdminRoleExists;
    } catch (error) {
        return false;
    }
}

export const isSuperAdminRole = async ({ roleIds }: Props, rolesEndpoint: string, token: string): Promise<boolean> => {
    try {
        const axiosConfig: AxiosRequestConfig ={
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.get<Role>(rolesEndpoint, axiosConfig);
        const roles = response.data.data;

        const isSuperAdminRole = roles.some((role) => roleIds.includes(role._id.toString()) && (role.roleName === "SUPER ADMIN" || role.roleName === "OWNER") );
        return isSuperAdminRole;
    } catch (error) {
        return false;
    }
}