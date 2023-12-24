import { User } from "../models/userModel";
import { RoleModel } from "../models/userRoles"

export const adminRoleToUser = async (userId: string, roleName: string) => {
    try {
        if (!userId || !roleName) {
            return "UserId or Role Name is empty"
        }
        const adminRole = await RoleModel.findOne({ roleName: roleName });
        if (!adminRole) {
            return 'Role not found';
        }
        const user = await User.findById(userId);
        if (!user) {
            return 'User not found';
        }

        if (!user.roles) {
            user.roles = [];
        }

        if (!user.roles.includes(adminRole._id)) {
            user.roles.push(adminRole._id);
            await user.save();
            return 'ADMIN role added successfully';
        } else {
            return `User already has role ${roleName}`;
        }
    } catch (error) {
        console.error('Error adding ADMIN role:', error);
        throw error;
    }
};

export const removeRoleFromUser = async (userId: string, roleName: string) => {
    try {
        const roleToRemove = await RoleModel.findOne({ roleName: roleName });
        if (!roleToRemove) {
            throw new Error('Role not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.roles || user.roles.length === 0) {
            return `User does not have any roles to remove`;
        }

        const roleIndex = user.roles.findIndex((roleId) => roleId.equals(roleToRemove._id));
        if (roleIndex !== -1) {
            user.roles.splice(roleIndex, 1);
            await user.save();
            return `Role ${roleName} removed successfully`;
        } else {
            return `User does not have the role ${roleName}`;
        }
    } catch (error) {
        console.error('Error removing role:', error);
        throw error;
    }
};
