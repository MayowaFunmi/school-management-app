import { Zone } from "../models/zoneModel";
import { Organization } from "../models/organizationModel";

export const createZone = async (orgId: string, zoneName: string) => {
    if (!zoneName || !orgId) {
        return null;
    }
    const newOrg = new Zone({
        organizationId: orgId,
        name: zoneName
    })
    await newOrg.save();
    return newOrg;
}

export const allOrganizationZones = async (orgId: string) => {
    if (!orgId) {
        throw new Error(' Organization Id cannot be null');
    }

    // get organization with the uniqueId
    const org = await Organization.findOne({ organizationUniqueId: orgId });
    if (!org) {
        throw new Error(' Organization with uniqueId not found');
    }

    const zones = await Zone.find({ organizationId: org._id })
    return zones;
}