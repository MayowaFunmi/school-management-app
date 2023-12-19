import { generateUserUniqueId } from "../utilities/randomeId";
import { User } from "../models/userModel";
import { RoleModel } from "../models/userRoles";

export const createUser = async (userData: Record<string, any>) => {
    try {
        const uniqueId = generateUserUniqueId();
        userData.uniqueId = uniqueId;

        const user = await User.create(userData);

        const userRole = await RoleModel.findOne({ roleName: 'USERS'});
        const ownerRole = await RoleModel.findOne({ roleName: 'OWNER'});
        if (userRole) {
            user.roles.push(userRole._id);
            await user.save();
        }
        if (ownerRole && user.email === 'akinade.mayowa@gmail.com') {
            user.roles.push(ownerRole._id);
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

export const userByUniqueId = async (uniqueId: string) => {
    try {
        const user = await User.findOne({ uniqueId }).populate('roles');
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error
    }
}