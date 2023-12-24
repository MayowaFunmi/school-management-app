import { Response } from "express";
import { ExtendedRequest } from "../middleware/isAuthenticated";
import { allOrganizations, createOrganization, getOrganizationByAdminId, retrieveAdminOrganizations } from "../services/organizationServices";

export const addOrganization = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const { organizationName } = req.body;
        const result = await createOrganization(userId, organizationName);
        return res.status(200).json({ message: result});
    } catch (error) {
        console.log("error occured - ", error);
        return res.status(500).json({ message: "Failed to create organization "})
    }
}

export const organizationByAdminId = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const orgId: string | null = await getOrganizationByAdminId(userId);
        if (!orgId) {
            return res.status(404).json({ message: "user not found for the organization" })
        }
        return res.status(200).json({ message: "organization id retrieved successfully", data: orgId })
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`});
    }
}

export const adminOrganizations = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const organizations = await retrieveAdminOrganizations(userId);
        
        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: "No organization found for this user id"})
        }
        return res.status(200).json({ data: organizations })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const listAllOrganizations = async (req: ExtendedRequest, res: Response) => {
    try {
        const allOrgs = await allOrganizations();
        if (allOrgs.length === 0) {
            return res.status(404).json({ message: "No organization found"})
        }
        return res.status(200).json({ message: "all organizations retrieved successfully", data: allOrgs })
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`});
    }
}