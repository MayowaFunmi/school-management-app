import { Department } from "../models/departmentModel";

export const createDepartment = async (orgUniqueId: string, deptName: string) => {
    if (!deptName || !orgUniqueId) {
        throw new Error('Zone name or organization Id cannot be null');
    }

    const newDept = new Department({
        name: deptName,
        organizationUniqueId: orgUniqueId
    })
    await newDept.save();
    return newDept;
}