import { checkAdminRole, checkOwnerRole, checkSuperAdminRole } from '../middleware/checkAdminRole';
import { addAdminRoleToUser, addNewRole, getAllRoles } from '../controllers/rolesController';
import { Router } from 'express';
import { verifyLogin } from '../middleware/isAuthenticated';

const router = Router();

router.post('/add-new-role', verifyLogin, checkSuperAdminRole, addNewRole);
router.get('/show-all-roles', verifyLogin, checkAdminRole, getAllRoles);
router.post('/add-role-to-user', checkSuperAdminRole, addAdminRoleToUser);

export default router;