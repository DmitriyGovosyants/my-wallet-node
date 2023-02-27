const isValid = require('mongoose').Types.ObjectId.isValid;
const { User } = require('../models');

// Находит юзера в базе по id
const findUserById = async id => {
  if (!isValid(id)) return false;

  const user = await User.findById(id).select('-password, -token');
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

// Обновление информации юзера
const updateUserInfo = async (userID, info) => {
  const { currency } = info;
  return await User.findByIdAndUpdate(
    { _id: userID },
    {
      $set:
      {
        "settings.mainCurrency": currency
      }
    },
    // { new: true }
  );
};

// const addUserAvatar = async (avatar: avatarUrl, user) => {
//   const avatar = await User.findByIdAndUpdate(
//     { _id: user._id },
//     {
//       avatar: avatarUrl,
//     },
//     { new: true }
//   );
//   if (!avatar) {
//     return null;
//   }
//   return avatar;
// };

module.exports = {
  findUserById,
  findUserByEmail,
  updateUserInfo,
  // addUserAvatar,
};
