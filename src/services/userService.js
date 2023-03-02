import pool from "../configs/connectDB";

let getAllUsers = async () => {
  const [data, fields] = await pool.execute("SELECT * FROM `users`");
  return data;
};

let addUser = async (req, res) => {
  let {
    email,
    password,
    firstName,
    lastName,
    address,
    gender,
    roleId,
    phoneNumber,
    positionId,
  } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return {
      status: 500,
      message: "First name, last name, email and address are required!",
    };
  }

  await pool.execute(
    "INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `address`, `gender`, `roleId`, `phoneNumber`, `positionId`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      email,
      password,
      firstName,
      lastName,
      address,
      gender,
      roleId,
      phoneNumber,
      positionId,
    ]
  );

  return {
    status: 201,
    message: "Add success!",
  };
};

let detailUser = async (req, res) => {
  let id = req.params.id;
  let [user, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `id` = ?",
    [id]
  );

  return user[0];
};

let updateUser = async (req, res) => {
  let id = req.params.id;
  let {
    email,
    password,
    firstName,
    lastName,
    address,
    gender,
    roleId,
    phoneNumber,
    positionId,
  } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return {
      status: 500,
      message: "First name, last name, email and address are required!",
    };
  }

  await pool.execute(
    "UPDATE `users` SET email = ?, password = ?, firstName = ?, lastName = ?, address = ?, gender = ?, roleId = ?, phoneNumber = ?, positionId = ? WHERE id = ?",
    [
      email,
      password,
      firstName,
      lastName,
      address,
      gender,
      roleId,
      phoneNumber,
      positionId,
      id,
    ]
  );

  return {
    status: 200,
    message: "Update success!",
  };
};

let deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    await pool.execute("DELETE FROM `users` WHERE id = ?", [id]);

    return {
      status: 200,
      message: "Delete success!",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Delete user error!",
    };
  }
};

module.exports = {
  getAllUsers,
  addUser,
  detailUser,
  updateUser,
  deleteUser,
};
