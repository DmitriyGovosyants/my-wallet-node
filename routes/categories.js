const express = require('express');
const { categoryController } = require('../controllers');
const { categoryValidation, authentificate } = require('../middlewares');
const { ctrlWrapper } = require('../helpers');

const router = express.Router();

const { getCategoriesController, addCategoryController, updateCategoryController, deleteCategoryController } =
  categoryController;

router.get(
  '/',
  authentificate,
  ctrlWrapper(getCategoriesController)
);
router.post(
  '/',
  authentificate,
  categoryValidation,
  ctrlWrapper(addCategoryController)
);
router.put(
  '/:accountID',
  authentificate,
  categoryValidation,
  ctrlWrapper(updateCategoryController)
);
router.delete(
  '/:accountID',
  authentificate,
  ctrlWrapper(deleteCategoryController)
);

module.exports = router;
