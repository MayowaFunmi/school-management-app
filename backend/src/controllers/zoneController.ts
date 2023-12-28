import { Response } from "express";
import { ExtendedRequest } from "../middleware/isAuthenticated";
import { organizationExists } from "../services/organizationServices";
import { allOrganizationZones, createZone } from "../services/zoneServices";

export const addZone = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId } = req.user;
        const { organizationUniqueId, zoneName } = req.body;
        const orgId = await organizationExists(organizationUniqueId, userId);
        if (orgId) {
            const response = await createZone(orgId, zoneName);
            if (response === null) {
                return res.status(400).json({ message: "Zone name or organization Id cannot be null"})
            }
            return res.status(200).json({ message: "Zone created successfully", data: response })
        } else {
            return res.status(401).json({ message: "error: org does not exist or you are not authorized to access the org"})
        }
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}

export const listOrganizationZones = async (req: ExtendedRequest, res: Response) => {
    try {
        const { organizationUniqueId } = req.query;
        const zones = await allOrganizationZones(organizationUniqueId as string);
        if (zones.length === 0) {
            return res.status(200).json({ message: "Zones not found", data: zones })
        }
        return res.status(200).json({ message: "Zones retrieved successfully", data: zones })
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}