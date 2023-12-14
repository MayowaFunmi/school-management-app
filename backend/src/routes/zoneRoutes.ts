import { checkAdminRole } from '../middleware/checkAdminRole';
import { verifyLogin } from '../middleware/isAuthenticated';
import express from 'express';
import { addZone, listZones } from '../controllers/zoneController';

const router = express.Router();

router.post('/add-zone', verifyLogin, checkAdminRole, addZone);
router.get('/all-zone-lists', verifyLogin, listZones);

export default router;