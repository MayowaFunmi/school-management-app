import jwt from 'jsonwebtoken';
import { jwtKey } from '../config/Config';

export interface DecodedToken {
    userId: string;
    roles: string[];
}

export const decodedToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.verify(token, jwtKey);
        return decoded as DecodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}