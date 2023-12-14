import { Response } from "express";
import { ExtendedRequest } from "../middleware/isAuthenticated";
import { organizationExists } from "../services/organizationServices";
import { allZones, createZone } from "../services/zoneServices";

export const addZone = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const { uniqueId, zoneName } = req.body;
        const orgId = await organizationExists(uniqueId, userId);
        if (orgId) {
            const response = await createZone(orgId, zoneName);
            return res.status(200).json({ message: "Zone created successfully", data: response })
        } else {
            return res.status(401).json({ message: "error: org does not exist or you are not authorized to access the org"})
        }
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}

export const listZones = async (req: ExtendedRequest, res: Response) => {
    try {
        const { organizationUniqueId } = req.body;
        const zones = await allZones(organizationUniqueId);
        return res.status(200).json({ message: "Zone created successfully", data: zones })
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}