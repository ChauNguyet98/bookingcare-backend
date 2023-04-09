import userService from "../services/userService";

let getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();

  return res.status(200).json({
    message: "OK",
    data: data,
  });
};

let addUser = async (req, res) => {
  const result = await userService.addUser(req, res);
  return res.status(result.status).json({
    message: result.message,
  });
};

let detailUser = async (req, res) => {
  const data = await userService.detailUser(req, res);
  return res.status(200).json({
    message: "OK",
    data: data,
  });
};

let updateUser = async (req, res) => {
  let result = await userService.updateUser(req, res);
  return res.status(result.status).json({
    message: result.message,
  });
};

let deleteUser = async (req, res) => {
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
