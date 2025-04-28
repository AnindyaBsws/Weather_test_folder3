import express from 'express';
import wrapAsync from './../utils/wrapAsync.js';
import passport from 'passport';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', wrapAsync(signup));
router.post('/login', passport.authenticate('local', {failWithError: true}), wrapAsync(login));
router.post('/logout', logout);

export default router;
