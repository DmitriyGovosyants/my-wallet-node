const { categoryService } = require('../services');
const { getCategories, addCategory, updateCategory, deleteCategory } = categoryService;

const getCategoriesController = async (req, res) => {
  const user = req.user;
  const allCategories = await getCategories(user._id);

  if (allCategories) {
    res.json({
      code: 200,
      message: 'All categories',
      categories: allCategories,
    });
  }
};

const addCategoryController = async (req, res) => {
  const user = req.user;
  const category = req.body;
  const newCategory = await addCategory(user._id, category);

  if (newCategory) {
    res.status(201).json({
      code: 201,
      message: 'Category added',
    });
  };
};

const updateCategoryController = async (req, res) => {
  console.log(req.params)
  const { categoryID } = req.params;
  const body = req.body;
  const result = await updateCategory(categoryID, body);

  if (result) {
    res.status(201).json({
      code: 201,
      message: 'Category updated',
    });
  }
};


const deleteCategoryController = async (req, res) => {
  const user = req.user;
  const { categoryID } = req.params;
  const result = await deleteCategory(user._id, categoryID);

  if (result) {
    res.json({
      code: 200,
      message: 'Category deleted',
    });
  }
};

module.exports = {
  getCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
};