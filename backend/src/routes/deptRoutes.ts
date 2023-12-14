import { verifyLogin } from '../middleware/isAuthenticated';
import express from 'express';
import { checkAdminRole, checkOwnerRole } from '../middleware/checkAdminRole';
import { addDepartment } from '../controllers/departmentController';

const router = express.Router();

router.post('/add-department', verifyLogin, checkAdminRole, addDepartment);

export default router;