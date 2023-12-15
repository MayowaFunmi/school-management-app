import { Request, Response } from "express";
import { allUsers, createUser } from "../services/userServices";
import bcrypt from 'bcrypt';
import { ExtendedRequest } from '../middleware/isAuthenticated';
import { User } from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
    roles: string[];
    iat: number;
    exp: number;
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userDate = {
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword
        };
        const newUser = await createUser(userDate);
        return res.status(200).json({ message: "User created successfully", data: newUser })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        };
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // create access token
        const accessToken = jwt.sign(
            {
                userId: user._id, roles: user.roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m'}
        );

        res.status(200).json({ message: "user signed in successfully", data: accessToken})
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// export const refreshToken = async (req: ExtendedRequest, res: Response) => {
//     const newAccessToken = jwt.sign(
//         {
//             userId: req.user.userId, roles: req.user.roles
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '30m'}
//     );
//     return res.status(200).json({ newAccessToken: newAccessToken })
// }

export const refreshToken = async (req: ExtendedRequest, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ message: 'Access token not provided.' });
    }

    try {
        // Decode the token without verification
        const decoded = jwt.decode(token.replace('Bearer ', ''));

        if (decoded) {
            // Extract user information from the decoded payload
            const { userId, roles } = decoded as DecodedToken;
            console.log(`user id = ${userId} and roles = ${roles}`)
            const newAccessToken = jwt.sign(
                { userId, roles },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            return res.status(200).json({ newAccessToken });
        } else {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'User not authenticated.', data: error });
    }
};

export const listUsers = async (req: ExtendedRequest, res: Response) => {
    try {
        const users = await allUsers();
        return res.status(200).json({ message:  `all ${users.length} users fetched successfully`, data: users })
    } catch (error) {
        console.error('Error etrieving users:', error);
        res.status(500).json({ message: 'Internal server error.' });   
    }
}