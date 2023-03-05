const { Category, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;

const getCategories = async (userID) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: 'categories',
    options: {
      sort: { createdAt: -1 }
    },
    select: '-createdAt -updatedAt',
  });
  return user.categories;
};

const addCategory = async (userID, category) => {
  const newCategory = await Category.create({
    ...category,
  });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { categories: newCategory._id } }
  );

  if (newCategory && updateUser) {
    return newCategory;
  }
};

const updateCategory= async (categoryID, body) => {
  return await Category.findByIdAndUpdate(
    { _id: categoryID },
    { ...body },
    { new: true }
  );
}

const deleteCategory = async (userID, categoryID) => {
  if (!isValid(categoryID)) return false;
  const user = await User.findOne({ _id: userID });
  if (!user.categories.includes(ObjectId(categoryID))) {
    return false;
  }
  await Category.findByIdAndRemove({ _id: categoryID });
  return await user.update({ $pull: { categories: categoryID } });
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
