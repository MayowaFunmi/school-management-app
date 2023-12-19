import { RoleModel } from "../models/userRoles";
import { ExtendedRequest } from "./isAuthenticated";
import { Response, NextFunction } from 'express';

export const checkAdminRole = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const adminRole = await RoleModel.findOne({ roleName: "ADMIN"});
    const ownerRole = await RoleModel.findOne({ roleName: "OWNER"});
    const userRoles = req.user.roles;

    if (userRoles && (userRoles.includes(adminRole._id.toString()) || userRoles.includes(ownerRole._id.toString()))) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
}

export const checkSuperAdminRole = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const superAdminRole = await RoleModel.findOne({ roleName: "SUPER ADMIN"});
    const ownerRole = await RoleModel.findOne({ roleName: "OWNER"});
    const userRoles = req.user.roles;

    if (userRoles && (userRoles.includes(superAdminRole._id.toString()) || userRoles.includes(ownerRole._id.toString()))) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
}

export const checkOwnerRole = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const ownerRole = await RoleModel.findOne({ roleName: "OWNER"});
    const userRoles = req.user.roles;

    if (userRoles && userRoles.includes(ownerRole._id.toString())) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
}