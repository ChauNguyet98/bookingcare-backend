const jwt = require("jsonwebtoken");
import env from "../../nodemon.json";
import pool from "../configs/connectDB";

const jwtSecretKey = env.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers["x-token"];

  if (!token) {
    return res
      .status(403)
      .send("Authentication fail! A token is required for authentication");
  } else {
    let [user, fields] = await pool.execute(
      "SELECT * FROM `users` WHERE `token` = ?",
      [token]
    );

    if (!user[0]) {
      return res.status(401).send("Authentication fail! Token is invalid!");
    }
  }

  //   try {
  //     const decoded = jwt.verify(token, jwtSecretKey);
  //     req.user = decoded;
  //     console.log(req.user);
  //   } catch (err) {
  //     return res.status(401).send("Authentication fail! Token is invalid!");
  //   }
  return next();
};

module.exports = verifyToken;
