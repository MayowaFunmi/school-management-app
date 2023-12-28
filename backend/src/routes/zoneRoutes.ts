import { checkAdminRole } from '../middleware/checkAdminRole';
import { verifyLogin } from '../middleware/isAuthenticated';
import express from 'express';
import { addZone, listOrganizationZones } from '../controllers/zoneController';

const router = express.Router();

router.post('/add-zone', verifyLogin, checkAdminRole, addZone);
router.get('/all-organization-zone-lists', verifyLogin, listOrganizationZones);

export default router;