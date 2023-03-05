const { Account, User } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;

const getAccounts = async (userID) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: 'accounts',
    options: {
      sort: { createdAt: -1 }
    },
    select: '-createdAt -updatedAt',
  });
  return user.accounts;
};

const addAccount = async (userID, account) => {
  const newAccount = await Account.create({
    ...account,
  });
  const updateUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { accounts: newAccount._id } }
  );

  if (newAccount && updateUser) {
    return newAccount;
  }
};

const updateAccount= async (accountID, body) => {
  return await Account.findByIdAndUpdate(
    { _id: accountID },
    { ...body },
    { new: true }
  );
}

const deleteAccount = async (userID, accountID) => {
  if (!isValid(accountID)) return false;
  const user = await User.findOne({ _id: userID });
  if (!user.accounts.includes(ObjectId(accountID))) {
    return false;
  }
  await Account.findByIdAndRemove({ _id: accountID });
  return await user.update({ $pull: { accounts: accountID } });
};

module.exports = {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
};
