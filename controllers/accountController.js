const { accountService } = require('../services');
const { getAccounts, addAccount, updateAccount, deleteAccount } = accountService;

const getAccountsController = async (req, res) => {
  const user = req.user;
  const allAccounts = await getAccounts(user._id);

  if (allAccounts) {
    res.json({
      code: 200,
      message: 'All accounts',
      accounts: allAccounts,
    });
  }
};

const addAccountController = async (req, res) => {
  const user = req.user;
  const account = req.body;
  const newAccount = await addAccount(user._id, account);

  if (newAccount) {
    res.status(201).json({
      code: 201,
      message: 'Account created',
    });
  };
};

const updateAccountController = async (req, res) => {
  const { accountID } = req.params;
  const body = req.body;
  const result = await updateAccount(accountID, body);

  if (result) {
    res.status(201).json({
      code: 201,
      message: 'Account updated',
    });
  }
};


const deleteAccountController = async (req, res) => {
  const user = req.user;
  const { accountID } = req.params;
  const result = await deleteAccount(user._id, accountID);

  if (result) {
    res.json({
      code: 200,
      message: 'Account deleted',
    });
  }
};

module.exports = {
  getAccountsController,
  addAccountController,
  updateAccountController,
  deleteAccountController,
};