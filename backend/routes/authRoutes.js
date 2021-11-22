// const express = require('express');

// const authController = require('../controllers/authController');
// const passport = require('passport');

// const router = express.Router();

// router.post('/signup', authController.signup_post);

// router.post('/login', authController.login_post);

// router.get('/logout', authController.logout_get);

// router.get(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   authController.profile_get
// );

// router.get(
//   '/user',
//   passport.authenticate('jwt', { session: false }),
//   authController.user_get
// );

// router.post('/email', authController.sendEmail);

// router.get(
//   '/email-verification/:email/:token',
//   authController.confirm_email_get
// );

// router.post(
//   '/resend-email-verification',
//   authController.resend_verification_post
// );

// router.post('/forgot-password', authController.forgot_password_post);

// router.post('/reset-password', authController.reset_password_post);

//module.exports = router;
