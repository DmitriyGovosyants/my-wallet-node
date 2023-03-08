const isValid = require('mongoose').Types.ObjectId.isValid;
const { User } = require('../models');

const findUserById = async id => {
  if (!isValid(id)) return false;

  const user = await User.findById(id).select('-password, -token');
  return user;
};

const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserInfo = async (userID, info) => {
  const { mainCurrency } = info;
  return await User.findByIdAndUpdate(
    { _id: userID },
    {
      $set:
      {
        "settings.mainCurrency": mainCurrency
      }
    },
    { new: true }
  );
};

module.exports = {
  findUserById,
  findUserByEmail,
  updateUserInfo,
};
