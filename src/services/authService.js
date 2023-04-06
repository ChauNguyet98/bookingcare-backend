import pool from "../configs/connectDB";

let getAccount = async (req, res) => {
  let { userName, password } = req.body;
  let [user, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `userName` = ? AND `password` = ?",
    [userName, password]
  );

  return user[0];
};

module.exports = {
  getAccount,
};
