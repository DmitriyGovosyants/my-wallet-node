const authRouter = require('./auth');
const settingsRouter = require('./settings');
const accountsRouter = require('./accounts');
const categoriesRouter = require('./categories');
const transactionsRouter = require('./transactions');

module.exports = {
  authRouter,
  settingsRouter,
  accountsRouter,
  categoriesRouter,
  transactionsRouter,
};
