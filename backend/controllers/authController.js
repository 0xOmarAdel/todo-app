const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/UserModel");

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    throw new BadRequestError("Please provide all the required fields.");
  }

  const newUser = await User.create({ name, email, phone, password });
  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all the required fields.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const validateToken = async (req, res) => {
  const userData = req.user;
  if (!userData) {
    throw new UnauthenticatedError("Token not valid");
  }
  res.status(200).json({ userData });
};

const updateUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const userId = req.user.userId;

  if (!name && !email && !phone && !password) {
    throw new BadRequestError("Please provide a field to update.");
  }

  const user = await User.findById(userId);

  if (!user) throw new UnauthenticatedError("User not found.");

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (password) user.password = password;

  await user.save();

  res.status(StatusCodes.OK).json({
    user: { name: user.name, email: user.email, phone: user.phone },
  });
};

module.exports = {
  register,
  login,
  validateToken,
  updateUser,
};
