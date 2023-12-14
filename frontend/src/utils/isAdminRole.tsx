import axios, { AxiosRequestConfig } from "axios";

interface Data {
    _id: string,
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
        console.log(`api response = ${response}`)
        const roles = response.data.data;

        const isAdminRoleExists = roles.some((role) => roleIds.includes(role._id) && role.roleName === "ADMIN");
        return isAdminRoleExists;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return false;
    }
}