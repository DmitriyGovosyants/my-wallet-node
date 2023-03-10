const { userService, authService } = require('../services');
const { findUserByEmail } = userService;
const { registration, login, logout } = authService;

const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      code: 409,
      message: 'Email is invalid',
    });
  }
  const token = await registration(req.body);
  res.status(201).json({
    code: 201,
    message: 'Registration success',
    token: token,
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(401).json({
      code: 401,
      message: 'Fill in all the fields',
    });
    return;
  }
  const result = await login(email, password);
  if (result === 'invalidEmail') {
    res.status(401).json({
      code: 401,
      message: 'Email is wrong',
    });
    return;
  }
  if (result === 'invalidPassword') {
    res.status(401).json({
      code: 401,
      message: 'Password is wrong',
    });
    return;
  }
  res.status(200).json({
    code: 200,
    token: result.token,
    message: 'Success',
  });
};

const logoutController = async (req, res) => {
  const { id, token } = req.user;
  await logout(id, token);
  res.json({
    code: 200,
    message: 'Success',
  });
};

const currentController = async (req, res) => {
  const { token } = req.user;
  if (!token) {
    return;
  }
  res.json({
    code: 200,
    message: 'User confirmed',
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentController,
};
