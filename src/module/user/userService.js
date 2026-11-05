const ApiError = require("../../error/handleApiError");
const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  const userEmail = user.email;
  const userExists = await User.findOne({ email: userEmail });
  if (!userExists) {
    const createUser = await User.create(user);
    if (!createUser) {
      throw new ApiError(501, "User doesn't added");
    }
    const { password, ...userWithoutPassword } = createUser;
    return userWithoutPassword;
  } else {
    throw new ApiError(501, "User already registered!");
  }
};

const loginUser = async (userEmail, userPassword) => {
  const findUser = await User.findOne({ email: userEmail });
  if (!findUser) {
    throw new ApiError(401, "User not found!");
  }
  const isValidPassword = await bcrypt.compare(userPassword, findUser.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid password!");
  }
  const accessToken = genAccessToken(
    findUser._id,
    findUser.firstName,
    findUser.email,
    findUser.role,
  );
  return accessToken;
};

const genAccessToken = (id, name, email, role) => {
  const token = jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};
const getUser = async (userEmail) => {
  //console.log(userEmail);
  const user = await User.findOne({ email: userEmail }).select("-password");
  return user;
};

const getAllUser = async () => {
  const users = await User.find();
  return users;
};

const getAdmin = async (userEmail) => {
  const admin = await User.findOne({ email: userEmail }).select("-password");
  return admin;
};

const userUpdate = async (update, user) => {
  const updateObject = {
    phone: update.phone,
    gender: update.gender,
  };
  const result = await User.findOneAndUpdate(
    { email: user.email },
    { $set: updateObject },
    { new: true, upsert: true },
  ).select("-password");
  return result;
};

const userUpdateAddress = async (update, user) => {
  const updateField = {
    city: update.city,
    address: update.address,
  };
  const result = await User.findOneAndUpdate(
    { email: user.email },
    { $set: updateField },
    { new: true, upsert: true },
  ).select("-password");
  return result;
};
module.exports = {
  addUser,
  loginUser,
  getUser,
  getAllUser,
  getAdmin,
  userUpdate,
  userUpdateAddress,
};
