const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

const listUsers = asyncHandler(async (_req, res) => {
  const users = await userService.listUsers();
  res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRoleAndStatus(
    req.params.id,
    req.body,
  );
  res.status(200).json(user);
});

module.exports = {
  createUser,
  listUsers,
  updateUser,
};
