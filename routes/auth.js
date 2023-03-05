const express = require('express');
const { authController } = require('../controllers');
const { userValidation, authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

const { registerController, loginController, logoutController, currentController } =
  authController;

router.post(
  '/register',
  userValidation,
  ctrlWrapper(registerController)
);
router.post(
  '/login',
  ctrlWrapper(loginController)
);
router.get(
  '/logout',
  authentificate,
  ctrlWrapper(logoutController)
);
router.get(
  '/current',
  authentificate,
  ctrlWrapper(currentController)
);

module.exports = router;
