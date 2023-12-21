import { Request, Response } from 'express';
import { createRole, getRoles } from '../models/userRoles';
import { adminRoleToUser, removeRoleFromUser } from '../services/rolesServices';

export const addNewRole = async (req: Request, res: Response) => {
    try {
        const roleName = req.body.roleName;
        if (!roleName) {
            return res.status(400).json({ message: "Role name should not be empty"})
        }
        const role = roleName.toUpperCase();
        const newRole = await createRole(role);
        res.status(201).json({ message: `Role ${role} added successfully`, data: newRole})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })
    }
}

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getRoles();
        return res.status(200).json({ message: "all roles fetched successfully", data: roles });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })
    }
}

export const addAdminRoleToUser = async (req: Request, res: Response) => {
    const { userId, roleName } = req.body;

    try {
        const resultMessage = await adminRoleToUser(userId, roleName);
        res.status(200).json({ message: resultMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const removeAdminRoleFromUser = async (req: Request, res: Response) => {
    const { userId, roleName } = req.body;

    try {
        const resultMessage = await removeRoleFromUser(userId, roleName);
        res.status(200).json({ message: resultMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};