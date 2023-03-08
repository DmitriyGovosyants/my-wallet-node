const { User, Transaction, Account } = require('../models');
const isValid = require('mongoose').Types.ObjectId.isValid;
const ObjectId = require('mongoose').Types.ObjectId;

const getTransactions = async (userID) => {
  const user = await User.findOne({ _id: userID }).populate({
    path: 'accounts',
    populate: {
      path: 'transactions'
    },
    // select: '-createdAt -updatedAt',
  });
  return user.accounts;
};

const addTransaction = async (accountID, transaction) => {
  const newTransaction = await Transaction.create({
    ...transaction,
  });
  const updateAccount = await Account.findByIdAndUpdate(
    { _id: accountID },
    { $push: { transaction: newTransaction._id } }
  );

  if (newTransaction && updateAccount) {
    return newTransaction;
  }
};

const updateTransaction = async (transactionID, body) => {
  return await Transaction.findByIdAndUpdate(
    { _id: transactionID },
    { ...body },
    { new: true }
  );
}

const deleteTransaction = async (accountID, transactionID) => {
  if (!isValid(transactionID)) return false;
  const account = await Account.findOne({ _id: accountID });
  if (!account.transactions.includes(ObjectId(transactionID))) {
    return false;
  }
  await Transaction.findByIdAndRemove({ _id: transactionID });
  return await account.update({ $pull: { transaction: transactionID } });
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
