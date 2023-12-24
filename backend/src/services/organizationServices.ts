import { generateOrgUniqueId } from "../utilities/randomeId";
import { Organization } from "../models/organizationModel";
import { User } from "../models/userModel"
import { adminRoleToUser } from "./rolesServices";

export const createOrganization = async (userId: string, organizationName: string) => {
    try {
        const adminUser = await User.findById(userId);
        let name: string = "";
        if (!adminUser) {
            throw new Error("user not found")
        }

        if (!organizationName)
        {
            return "Organization name cannot be empty";
        } else {
            name = organizationName.toLowerCase();
        }
        const savedOrg = new Organization({
            userId,
            organizationName: name,
            organizationUniqueId: generateOrgUniqueId()
        });
        await savedOrg.save();
        return `Organization ${name} created successfully`
    } catch (error) {
        console.log("error: ", error)
        return `Failed to create organization`
    }
    
}

export const getOrganizationByAdminId = async (adminId: string) => {
    const organization = await Organization.findOne({ userId: adminId });
    if (organization) {
        return organization._id.toString();
    }
}

export const retrieveAdminOrganizations = async (adminId: string) => {
    try {
        const adminOrgs = await Organization.find({ userId: adminId }).populate("userId");
        if (!adminOrgs) {
            return null
        }
        return adminOrgs;
    } catch (error) {
        throw error
    }
}

export const allOrganizations = async () => {
    try {
        return await Organization.find().populate("userId");
    } catch (error) {
        throw error
    }
}

export const organizationExists = async (orgUniqueId: string, adminId: string) => {
    if (!orgUniqueId) {
        throw new Error("Organization's unique id cannot be empty");
    }
    const org = await Organization.findOne({ organizationUniqueId: orgUniqueId });
    if (org && org.userId.toString() == adminId) {
        return orgUniqueId;
    } else {
        return "";
    }
}