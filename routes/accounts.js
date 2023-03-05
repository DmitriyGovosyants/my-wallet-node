const express = require('express');
const { accountController } = require('../controllers');
const { accountValidation, authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

const { getAccountsController, addAccountController, updateAccountController, deleteAccountController } =
  accountController;

router.get(
  '/',
  authentificate,
  ctrlWrapper(getAccountsController)
);
router.post(
  '/',
  authentificate,
  accountValidation,
  ctrlWrapper(addAccountController)
);
router.put(
  '/:accountID',
  authentificate,
  accountValidation,
  ctrlWrapper(updateAccountController)
);
router.delete(
  '/:accountID',
  authentificate,
  ctrlWrapper(deleteAccountController)
);

module.exports = router;
