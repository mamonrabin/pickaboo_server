import { Router } from 'express';
import { authControllers } from './auth.controller.js';
import { auth } from '../../utils/decodedToken.js';

const router = Router();

router.post('/login', authControllers.credentialsLogin);
router.post('/logout', authControllers.logout);
router.post("/reset-password", auth,authControllers.resetPassword)
router.post("/forgot-password", authControllers.forgotPassword)

export const AuthRoutes = router;
