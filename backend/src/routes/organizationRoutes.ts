import express from 'express';
import { verifyLogin } from '../middleware/isAuthenticated';
import { addOrganization, listAllOrganizations, organizationByAdminId } from '../controllers/organizationController';
import { checkAdminRole, checkOwnerRole } from '../middleware/checkAdminRole';

const router = express.Router();

router.post('/create-organization', verifyLogin, addOrganization);
router.get('/get-organization-by-admin-id', verifyLogin, checkAdminRole, organizationByAdminId);
router.get('/get-organizations', verifyLogin, checkOwnerRole, listAllOrganizations);

export default router;