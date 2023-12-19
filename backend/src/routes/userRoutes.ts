import { verifyLogin } from '../middleware/isAuthenticated';
import { getUserByUniqueId, listUsers, loginUser, refreshToken, registerUser } from '../controllers/userController';
import express from 'express';
import { checkOwnerRole, checkSuperAdminRole } from '../middleware/checkAdminRole';

const router = express.Router();

router.post('/register-user', registerUser);
router.post('/signin', loginUser);
router.get('/all-users', verifyLogin, checkOwnerRole, listUsers);
router.get('/get-user-by-unique-id', verifyLogin, checkSuperAdminRole, getUserByUniqueId);
router.post('/refresh-token', refreshToken);

export default router;