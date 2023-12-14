import { Zone } from "../models/zoneModel";

export const createZone = async (orgId: string, zoneName: string) => {
    if (!zoneName || !orgId) {
        throw new Error('Zone name or organization Id cannot be null');
    }
    const newOrg = new Zone({
        organizationUniqueId: orgId,
        name: zoneName
    })
    await newOrg.save();
    return newOrg;
}

export const allZones = async (orgId: string) => {
    if (!orgId) {
        throw new Error(' Organization Id cannot be null');
    }

    const zones = await Zone.find({ orgId })
    return zones;
}