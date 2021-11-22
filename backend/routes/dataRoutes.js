const express = require('express');
const asyncHandler = require('express-async-handler');

const dataController = require('../controllers/dataController');
const passport = require('passport');

const router = express.Router();

router.get(
  '/tasks',
  //passport.authenticate('jwt', { session: false }),
  dataController.getTasks_get
);

router.get(
  '/tasks/:id',
  //passport.authenticate('jwt', { session: false }),
  dataController.getSingleTask_get
);

router.put(
  '/tasks/:id',
  //passport.authenticate('jwt', { session: false }),
  dataController.updateTask_put
);

router.post(
  '/tasks',
  //passport.authenticate('jwt', { session: false }),
  dataController.addTask_post
);

router.delete(
  '/tasks/:id',
  //passport.authenticate('jwt', { session: false }),
  dataController.deleteTask_delete
);

module.exports = router;
