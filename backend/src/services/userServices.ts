import { generateUniqueId } from "../utilities/randomeId";
import { User } from "../models/userModel";
import { RoleModel } from "../models/userRoles";

export const createUser = async (userData: Record<string, any>) => {
    try {
        const uniqueId = generateUniqueId();
        userData.uniqueId = uniqueId;

        const user = await User.create(userData);

        const userRole = await RoleModel.findOne({ roleName: 'USERS'});
        if (userRole) {
            user.roles.push(userRole._id);
            await user.save();
        }
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const allUsers = async () => {
    try {
        const users = await User.find().populate('roles', 'roleName');
        return users;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}