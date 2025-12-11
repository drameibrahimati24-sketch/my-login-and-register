const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.render('index', { users: users });
}

const formUser = (req, res) => {
  res.render('form');
}

const submitUser = async (req, res) => {
  await userService.createUser(req.body);
  res.redirect('/');
}

module.exports = {
  getAllUsers,
  formUser,
  submitUser
}

