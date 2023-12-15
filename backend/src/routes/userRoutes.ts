import { verifyLogin } from '../middleware/isAuthenticated';
import { listUsers, loginUser, refreshToken, registerUser } from '../controllers/userController';
import express from 'express';
import { checkAdminRole, checkOwnerRole } from '../middleware/checkAdminRole';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/signin', loginUser);
router.get('/all-users', verifyLogin, checkOwnerRole, listUsers);
router.post('/refresh-token', refreshToken);

export default router;