import { Response } from "express";
import { ExtendedRequest } from "../middleware/isAuthenticated";
import { addSchool } from "services/schoolServices";

export const createSchool = async (req: ExtendedRequest, res: Response) => {
  try {
    const sch = await addSchool(req.body);
    if (sch) {
      
    }
  } catch (error) {
    
  }
}