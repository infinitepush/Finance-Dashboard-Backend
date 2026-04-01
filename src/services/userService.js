const User = require("../models/User");
const ApiError = require("../utils/ApiError");

async function createUser(payload) {
  const existingUser = await User.findOne({
    email: payload.email.toLowerCase(),
  });
  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }

  const user = await User.create({
    ...payload,
    email: payload.email.toLowerCase(),
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

async function listUsers() {
  return User.find().select("-password").sort({ createdAt: -1 });
}

async function updateUserRoleAndStatus(userId, updates) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (updates.role) {
    user.role = updates.role;
  }

  if (updates.status) {
    user.status = updates.status;
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    updatedAt: user.updatedAt,
  };
}

module.exports = {
  createUser,
  listUsers,
  updateUserRoleAndStatus,
};
