const { userService } = require('../services');
const { findUserById, updateUserInfo } = userService;

const getSettingsController = async (req, res) => {
  const user = await findUserById(req.user.id);
  if (user) {
    res.json({
      code: 200,
      settings: user.settings,
      message: 'Success',
    });
  };
};

const setMainCurrency = async (req, res) => {
  const user = req.user;
  const info = req.body;
  await updateUserInfo(user._id, info);
  res.status(201).json({
    code: 201,
    message: 'Success',
  });
}

module.exports = {
  getSettingsController,
  setMainCurrency,
};