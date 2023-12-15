import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { useJwt } from "react-jwt";
import { baseUrl } from "../config/Config";
import { isAdminRole } from "../utils/isAdminRole";
import { getRefreshToken } from "../features/userSlice";

interface AuthContextProps {
    isAuthenticated: boolean
    isAdminRoleExists: boolean | null
    token: string
    userId: string
    loading: boolean
    message: string
    status: string
}

interface DecodedToken {
    userId: string;
    roles: string[];
    iat: number;
    exp: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [userId, setUserId] = useState<string>("");
    const [roleIds, setRoleIds] = useState<string[]>([]);
    const [tokenExpired, setTokenExpired] = useState(Boolean);
    const [isAdminRoleExists, setIsAdminRoleExists] = useState<boolean | null>(null);

    const { isAuthenticated, token, loading, message, status } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { decodedToken, isExpired } = useJwt(token);

    useEffect(() => {
        if(token && isExpired) {
            dispatch(getRefreshToken(token));
        };
    }, [dispatch, isExpired, token])

    useEffect(() => {
        if (decodedToken) {
            const { roles, userId } = decodedToken as DecodedToken;
            setUserId(userId);
            setRoleIds(roles);
            setTokenExpired(isExpired)
            const rolesApiEndpoint = `${baseUrl}/api/roles/show-all-roles`;
            const fetchData = async () => {
                const isAdmin = await isAdminRole({ roleIds }, rolesApiEndpoint, token);
                setIsAdminRoleExists(isAdmin);
            }
            fetchData();
        };
        
    }, [decodedToken, roleIds, userId, isExpired, tokenExpired, token, isAdminRoleExists])
    
    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                token,
                loading,
                status,
                message,
                isAdminRoleExists,
                userId,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}