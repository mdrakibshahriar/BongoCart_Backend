const userService = require("./userService");

const signUpUser = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userService.addUser(user);
    if (result) {
      res.status(200).json({
        success: true,
        message: "User added successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.email);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User found successfully!",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const admin = await userService.getAdmin(req.params);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin data fetched successfully!",
      data: { admin },
    });
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const result = await userService.userUpdate(req.body, req.user);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User updated successfully!",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const userUpdateAddress = async (req, res, next) => {
  try {
    const result = await userService.userUpdateAddress(req.body, req.user);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User address updated!",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signUpUser,
  loginUser,
  getUser,
  getAllUser,
  getAdmin,
  userUpdate,
  userUpdateAddress,
};
