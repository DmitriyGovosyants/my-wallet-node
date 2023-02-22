const express = require('express');
const { authController } = require('../controllers');
const { userValidation, authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

const { registerController, loginController, logoutController, currentController } =
  authController;

router.post('/register', userValidation, ctrlWrapper(registerController)); //   Регистрация
router.post('/login', ctrlWrapper(loginController)); // Вход
router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
router.get('/current', authentificate, ctrlWrapper(currentController)); // Текущий юзер

module.exports = router;
