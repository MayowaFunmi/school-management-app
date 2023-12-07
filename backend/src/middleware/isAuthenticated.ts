import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface ExtendedRequest extends Request {
    user?: any;
}

export const verifyLogin = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ message: 'Access token not provided.'});
    }

    try {
        // verify the token using the secret key
        const decoded: any = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'User not authenticated.', data: error });
    }
}