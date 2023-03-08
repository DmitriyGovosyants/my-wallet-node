const { transactionService } = require('../services');
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionService;

const getTransactionsController = async (req, res) => {
  const user = req.user;
  const allTransactions = await getTransactions(user._id);

  if (allTransactions) {
    res.json({
      code: 200,
      message: 'All transactions',
      transactions: allTransactions,
    });
  }
};

const addTransactionController = async (req, res) => {
  const {accountID, transaction} = req.body;
  const newTransaction = await addTransaction(accountID, transaction);

  if (newTransaction) {
    res.status(201).json({
      code: 201,
      message: 'Transaction added',
    });
  };
};

const updateTransactionController = async (req, res) => {
  const { transactionID } = req.params;
  const body = req.body;
  const result = await updateTransaction(transactionID, body);

  if (result) {
    res.status(201).json({
      code: 201,
      message: 'Transaction updated',
    });
  }
};


const deleteTransactionController = async (req, res) => {
  const { transactionID } = req.params;
  const accountID = req.body;
  const result = await deleteTransaction(accountID, transactionID);

  if (result) {
    res.json({
      code: 200,
      message: 'Transaction deleted',
    });
  }
};

module.exports = {
  getTransactionsController,
  addTransactionController,
  updateTransactionController,
  deleteTransactionController,
};