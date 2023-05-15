import pool from "../configs/connectDB";
import userService from "../services/userService";
import authService from "../services/authService";

let getAllUsers = async (req, res) => {
  const isTokenExist = await authService.checkTokenExist(req);
  if (!isTokenExist) {
    return res.status(401).json({
      error: {
        errorCode: 401,
        message: "Authentication failed!",
      },
    });
  }

  const data = await userService.getAllUsers();
  return res.status(200).json({
    message: "OK",
    data: data,
  });
};

let addUser = async (req, res) => {
  const isTokenExist = await authService.checkTokenExist(req);
  if (!isTokenExist) {
    return res.status(401).json({
      error: {
        errorCode: 401,
        message: "Authentication failed!",
      },
    });
  }

  const isEmailExist = await userService.checkEmailExist(req.body.email);
  if (isEmailExist) {
    return res.status(500).json({
      error: {
        errorCode: 500,
        message: "User already exists!",
      },
    });
  }

  const result = await userService.addUser(req, res);
  return res.status(result.status).json({
    message: result.message,
  });
};

let detailUser = async (req, res) => {
  const isTokenExist = await authService.checkTokenExist(req);
  if (!isTokenExist) {
    return res.status(401).json({
      error: {
        errorCode: 401,
        message: "Authentication failed!",
      },
    });
  }

  const data = await userService.detailUser(req, res);
  if (!data) {
    return res.status(404).json({
      error: {
        errorCode: 404,
        message: "User isn't exist!",
      },
    });
  }

  return res.status(200).json({
    message: "OK",
    data: data,
  });
};

let updateUser = async (req, res) => {
  const isTokenExist = await authService.checkTokenExist(req);
  if (!isTokenExist) {
    return res.status(401).json({
      error: {
        errorCode: 401,
        message: "Authentication failed!",
      },
    });
  }

  const data = await userService.detailUser(req, res);
  if (!data) {
    return res.status(404).json({
      error: {
        errorCode: 404,
        message: "User isn't exist!",
      },
    });
  }

  let result = await userService.updateUser(req, res);
  return res.status(result.status).json({
    message: result.message,
  });
};

let deleteUser = async (req, res) => {
  const isTokenExist = await authService.checkTokenExist(req);
  if (!isTokenExist) {
    return res.status(401).json({
      error: {
        errorCode: 401,
        message: "Authentication failed!",
      },
    });
  }

  const result = await userService.deleteUser(req, res);
  return res.status(result.status).json({
    message: result.message,
  });
};

module.exports = {
  getAllUsers,
  addUser,
  detailUser,
  updateUser,
  deleteUser,
};
