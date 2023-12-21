import express from 'express';
import { verifyLogin } from '../middleware/isAuthenticated';
import { addOrganization, listAllOrganizations, organizationByAdminId } from '../controllers/organizationController';
import { checkAdminRole, checkOwnerRole, checkSuperAdminRole } from '../middleware/checkAdminRole';

const router = express.Router();

router.post('/create-organization', verifyLogin, checkAdminRole, addOrganization);
router.get('/get-organization-by-admin-id', verifyLogin, checkAdminRole, organizationByAdminId);
router.get('/get-organizations', verifyLogin, checkSuperAdminRole, listAllOrganizations);

export default router;