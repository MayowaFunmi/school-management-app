import { Response } from "express";
import { ExtendedRequest } from "../middleware/isAuthenticated";
import { organizationExists } from "../services/organizationServices";
import { createDepartment } from "../services/departmentServices";

export const addDepartment = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const { orgUniqueId, deptName } = req.body;
        const orgId = await organizationExists(orgUniqueId, userId);
        if(orgId) {
            const response = await createDepartment(orgId, deptName);
            return res.status(200).json({ message: "Department created successfully", data: response })
        } else {
            return res.status(401).json({ message: "error: org does not exist or you are not authorized to access the org"})
        }
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}