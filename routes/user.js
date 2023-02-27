const express = require('express');
const { authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');
const { userController } = require('../controllers');

const router = express.Router();

const { getSettings, setMainCurrency } = userController;

router.get('/settings', authentificate, ctrlWrapper(getSettings));
router.patch('/currency', authentificate, ctrlWrapper(setMainCurrency)); // Вход
// router.get('/logout', authentificate, ctrlWrapper(logoutController)); // Выход
// router.get('/current', authentificate, ctrlWrapper(currentController)); // Текущий юзер

module.exports = router;
