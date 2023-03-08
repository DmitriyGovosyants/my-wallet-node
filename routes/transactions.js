const express = require('express');
const { transactionController } = require('../controllers');
const { transactionValidation, authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

const { getTransactionsController, addTransactionController, updateTransactionController, deleteTransactionController } =
  transactionController;

router.get(
  '/',
  authentificate,
  ctrlWrapper(getTransactionsController)
);
router.post(
  '/',
  authentificate,
  transactionValidation,
  ctrlWrapper(addTransactionController)
);
router.put(
  '/:transactionID',
  authentificate,
  transactionValidation,
  ctrlWrapper(updateTransactionController)
);
router.delete(
  '/:transactionID',
  authentificate,
  ctrlWrapper(deleteTransactionController)
);

module.exports = router;
