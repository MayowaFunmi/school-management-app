import { User } from "../models/userModel";
import { RoleModel } from "../models/userRoles"

export const adminRoleToUser = async (userId: string, roleName: string) => {
    try {
        const adminRole = await RoleModel.findOne({ roleName: roleName });
        if (!adminRole) {
            throw new Error('Role not found');
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.roles) {
            user.roles = [];
        }

        if (!user.roles.includes(adminRole._id)) {
            user.roles.push(adminRole._id);
            await user.save();
            console.log('ADMIN role added successfully');
        } else {
            console.log(`user already has role ${roleName}`);
        }
    } catch (error) {
        console.error('Error adding ADMIN role:', error);
        throw error;
    }
}