import { generateUniqueId } from "../utilities/randomeId";
import { Organization } from "../models/organizationModel";
import { User } from "../models/userModel"
import { adminRoleToUser } from "./rolesServices";

export const createOrganization = async (userId: string, orgName: string) => {
    const adminUser = await User.findById(userId);
    let name: string = "";
    if (!adminUser) {
        throw new Error("user not found")
    }

    if (!orgName)
    {
        throw new Error("Organization name cannot be empty");
    } else {
        name = orgName.toLowerCase();
    }
    const savedOrg = new Organization({
        userId,
        organizationName: name,
        organizationUniqueId: generateUniqueId()
    });
    await savedOrg.save();

    // add Admin role to user
    await adminRoleToUser(userId, "ADMIN");
}

export const getOrganizationByAdminId = async (adminId: string) => {
    const organization = await Organization.findOne({ userId: adminId });
    if (organization) {
        return organization._id.toString();
    }
}

export const allOrganizations = async () => {
    const orgs = await Organization.find();
    return orgs;
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