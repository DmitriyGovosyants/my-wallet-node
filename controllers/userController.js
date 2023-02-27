const { userService, authService } = require('../services');
const { findUserById, updateUserInfo } = userService;

//  Получение настроек
const getSettings = async (req, res) => {
  const user = await findUserById(req.user.id);
  if (user) {
    res.json({
      code: 200,
      settings: user.settings,
      status: 'Success',
    });
  };
};

//  Установка главной валютьі
const setMainCurrency = async (req, res) => {
  const user = req.user;
  const info = req.body;
  await updateUserInfo(user._id, info);
  res.status(201).json({
    code: 201,
    status: 'Success',
  });
}

module.exports = {
  getSettings,
  setMainCurrency,
};