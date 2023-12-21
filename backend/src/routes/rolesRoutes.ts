import { checkAdminRole, checkOwnerRole, checkSuperAdminRole } from '../middleware/checkAdminRole';
import { addAdminRoleToUser, addNewRole, getAllRoles, removeAdminRoleFromUser } from '../controllers/rolesController';
import { Router } from 'express';
import { verifyLogin } from '../middleware/isAuthenticated';

const router = Router();

router.post('/add-new-role', verifyLogin, checkSuperAdminRole, addNewRole);
router.get('/show-all-roles', getAllRoles);
router.post('/add-role-to-user', verifyLogin, checkSuperAdminRole, addAdminRoleToUser);
router.post('/remove-role-from-user', verifyLogin, checkSuperAdminRole, removeAdminRoleFromUser);

export default router;