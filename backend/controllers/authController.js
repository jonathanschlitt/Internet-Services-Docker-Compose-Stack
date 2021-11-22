// // Email and Templates packages
// const nodemailer = require('nodemailer');
// const ejs = require('ejs');

// // Importing authentication packages
// const jwt = require('jsonwebtoken');
// const key = process.env.SECRET;
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

// // importing configurations
// // const smtpAccount = require('../config/keys').smtpAccount;

// // importing Mongoose Schemas
// const User = require('../models/User');
// const Token = require('../models/Token');

// // Importing the AscynHandler Middleware for error handling
// const asyncHandler = require('express-async-handler');

// // Creating a JWT
// // max age in seconds
// const maxAge = 3 * 24 * 60 * 60;

// // creating a token
// const createToken = (payload) => {
//   return jwt.sign(payload, key, {
//     expiresIn: maxAge,
//   });
// };

// // emailHandler = asyncHandler(async (mailOptions) => {
// //   // create reusable transporter object using the default SMTP transport
// //   let transporter = nodemailer.createTransport({
// //     host: smtpAccount.host,
// //     port: 587,
// //     secure: false, // true for 465, false for other ports
// //     auth: {
// //       user: smtpAccount.username,
// //       pass: smtpAccount.password,
// //     },
// //   });

// //   // send mail with defined transport object
// //   await transporter.sendMail(mailOptions);
// // });

// // emailVerification = asyncHandler(async (user, token) => {
// //   let verificationURL = `http://localhost:3333/api/auth/email-verification/${user.email}/${token.value}`;

// //   let email = await ejs.renderFile('./email_templates/emailVerification.ejs', {
// //     user: {
// //       name: user.surname,
// //       email: user.email,
// //       link: verificationURL,
// //     },
// //   });

// //   if (!email) {
// //     throw new Error('Error creating email Template!');
// //   } else {
// //     var mailOptions = {
// //       from: 'no-reply@example.com',
// //       to: user.email,
// //       subject: 'Ecommerce - Verify the email of your account',
// //       html: email,
// //     };

// //     await emailHandler(mailOptions);
// //   }
// // });

// // passwordReset = asyncHandler(async (user, token) => {
// //   let resetURL = `http://localhost:3000/?email=${user.email}&token=${token.value}`;

// //   let email = await ejs.renderFile('./email_templates/passwordReset.ejs', {
// //     user: {
// //       name: user.surname,
// //       email: user.email,
// //       link: resetURL,
// //     },
// //   });

// //   if (!email) {
// //     throw new Error('Error creating email Template!');
// //   } else {
// //     var mailOptions = {
// //       from: 'no-reply@example.com',
// //       to: user.email,
// //       subject: 'Reset your Ecommerce password',
// //       html: email,
// //     };

// //     await emailHandler(mailOptions);
// //   }
// // });

// signup_post = asyncHandler(async (req, res) => {
//   const { surname, lastname, email, password } = req.body;

//   const checkUser = await User.findOne({ email: email });

//   if (checkUser) {
//     res.status(400);
//     throw new Error('This email is already registered.');
//   }

//   const userData = { surname, lastname, email, password };

//   const salt = await bcrypt.genSalt();

//   userData.password = await bcrypt.hash(userData.password, salt);

//   const user = await User.create(userData);

//   if (user) {
//     // generate token and save
//     // var token = await new Token({
//     //   _userId: user._id,
//     //   value: crypto.randomBytes(16).toString('hex'),
//     // });

//     // const tokenSuccess = await token.save();

//     // if (tokenSuccess) {
//     //   await emailVerification(user, token);

//     //   res.status(200).json({
//     //     message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you not get verification Email click on resend token.`,
//     //   });
//     // } else {
//     //   res.status(500);
//     //   throw new Error('Error creating verification token.');
//     // }
//     res.status(201).json({ message: 'User has been created!' });
//   } else {
//     res.status(500);
//     throw new Error('Error creating new user.');
//   }
// });

// login_post = asyncHandler(async (req, res) => {
//   var { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(401);
//     throw new Error(
//       `The email address ${email} is not associated with any account. Please check and try again!`
//     );
//   }

//   // comapre user's password if user is find in above step
//   else if (await !bcrypt.compare(password, user.password)) {
//     res.status(401);
//     throw new Error('Wrong Password!');
//   }

//   // check user is verified or not
//   // else if (!user.isVerified) {
//   //   res.status(401);
//   //   throw new Error(
//   //     'Your Email has not been verified. Please check your mailbox or click on resend verification!'
//   //   );
//   // }
//   else {
//     const payload = {
//       id: user._id,
//       email: user.email,
//     };

//     const token = createToken(payload);

//     res.status(200).json({ token: `Bearer ${token}` });
//   }
// });

// // It is GET method
// // app.get('/confirmation/:email/:token',confirmEmail)

// // confirm_email_get = asyncHandler(async (req, res) => {
// //   const token = await Token.findOne({ value: req.params.token });
// //   console.log(token);

// //   // token is not found into database i.e. token may have expired
// //   if (!token) {
// //     res.status(400);
// //     throw new Error(
// //       'Your verification link may have expired. Please click on resend for verify your Email.'
// //     );
// //   }
// //   // if token is found then check valid user
// //   else {
// //     const user = await User.findOne({
// //       _id: token._userId,
// //       email: req.params.email,
// //     });
// //     // not valid user
// //     if (!user) {
// //       res.status(401);
// //       throw new Error(
// //         'We were unable to find a user for this verification. Please SignUp!'
// //       );
// //     }

// //     // user is already verified
// //     else if (user.isVerified) {
// //       res.status(200);
// //       throw new Error('User has already been verified. Please Login!');
// //     }

// //     // verify user
// //     else {
// //       // change isVerified to true
// //       user.isVerified = true;

// //       const userSaved = await user.save();

// //       if (!userSaved) {
// //         res.status(500);
// //         throw new Error();
// //       }
// //       // account successfully verified
// //       else {
// //         await Token.deleteOne({ _userId: user._id });

// //         res
// //           .status(200)
// //           .json({ message: 'Your account has been successfully verified' });
// //       }
// //     }
// //   }
// // });

// // resend_verification_post = asyncHandler(async (req, res) => {
// //   const { email } = req.body;

// //   const user = await User.findOne({ email: email });
// //   // user is not found into database
// //   if (!user) {
// //     res.status(400);
// //     throw new Error(
// //       'We were unable to find a user with that email. Make sure your Email is correct!'
// //     );
// //   }
// //   // user has been already verified
// //   else if (user.isVerified) {
// //     res.status(200);
// //     throw new Error('This account has been already verified. Please log in.');
// //   }

// //   // send verification link
// //   else {
// //     // generate token and save
// //     var token = new Token({
// //       _userId: user._id,
// //       value: crypto.randomBytes(16).toString('hex'),
// //     });
// //     const tokenSuccess = await token.save();

// //     if (tokenSuccess) {
// //       await emailVerification(user, token);
// //       res.status(200).json({
// //         message: `A verification email has been sent to ${user.email}. It will be expire after one day. If you not get verification Email click on resend token.`,
// //       });
// //     } else {
// //       res.status(500);
// //       throw new Error('Error creating verification token.');
// //     }
// //   }
// // });

// // forgot_password_post = asyncHandler(async (req, res) => {
// //   const { email } = req.body;

// //   const user = await User.findOne({ email: email });

// //   if (!user) {
// //     throw new Error('User was not found!');
// //   } else if (!user.isVerified) {
// //     throw new Error(
// //       'You have to verify the user first! Use the email verification link or request a new verification Email!'
// //     );
// //   } else {
// //     var token = await new Token({
// //       _userId: user._id,
// //       value: crypto.randomBytes(16).toString('hex'),
// //     });

// //     const tokenSuccess = await token.save();

// //     if (tokenSuccess) {
// //       await passwordReset(user, token);
// //       res.status(200).json({
// //         message: `A password reset email has been sent to
// //           ${user.email}. It will be expire after one day. If you not get the password reset Email click again on forgot password.`,
// //       });
// //     } else {
// //       throw new Error('Error creating verification token.');
// //     }
// //   }
// // });

// // reset_password_post = asyncHandler(async (req, res) => {
// //   const { urlToken, password } = req.body;

// //   const token = Token.findOne({ token: urlToken });

// //   // token is not found into database i.e. token may have expired
// //   if (!token) {
// //     res.status(400);
// //     throw new Error(
// //       'Your password reset link is expired or your are not authorized. Please click on request the password reset again!'
// //     );
// //   } else {
// //     const salt = await bcrypt.genSalt();

// //     let newPassword = await bcrypt.hash(password, salt);

// //     await User.updateOne(
// //       { _id: token._userId },
// //       { $set: { password: newPassword } }
// //     );

// //     await Token.deleteOne({ _userId: token._userId });

// //     res.status(201).json({ message: 'Your password reset was successfull. ' });
// //   }
// // });

// logout_get = async (req, res) => {
//   res.status(200).json({ token: `` });
// };

// profile_get = (req, res) => {
//   res.json(req.user);
// };

// user_get = (req, res) => {
//   const { name, _id, username, email } = req.user;
//   const user = {
//     _id,
//     name,
//     username,
//     email,
//   };
//   res.json({ user: user });
// };

// module.exports = {
//   signup_post,
//   login_post,
//   logout_get,
//   profile_get,
//   user_get,
//   // confirm_email_get,
//   // resend_verification_post,
//   // forgot_password_post,
//   // reset_password_post,
// };
