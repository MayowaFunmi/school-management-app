import { School } from "models/schoolModel";
import { schoolUniqueId } from "utilities/randomeId";

interface CreateSchoolInput {
  organizationUniqueId: string
  schoolUniqueId: string
  zone: string
  name: string
  address: string
}

export const addSchool = async (schoolData: CreateSchoolInput): Promise<any> => {
  try {
    schoolData.schoolUniqueId = schoolUniqueId();
    const school = new School(schoolData);
    const result = await school.save();
    return result;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}