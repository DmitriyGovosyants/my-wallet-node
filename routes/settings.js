const express = require('express');
const { authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');
const { settingsController } = require('../controllers');

const router = express.Router();

const { getSettingsController, setMainCurrency } = settingsController;

router.get(
  '/',
  authentificate,
  ctrlWrapper(getSettingsController)
);
router.put(
  '/',
  authentificate,
  ctrlWrapper(setMainCurrency)
);

module.exports = router;
