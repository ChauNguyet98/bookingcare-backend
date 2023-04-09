import pool from "../configs/connectDB";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

let handleUserLogin = async (email, password) => {
  let isExist = await checkEmailExist(email);
  let userData = {};
  if (isExist) {
    let [user, fields] = await pool.execute(
      "SELECT * FROM `users` WHERE `email` = ?",
      [email]
    );

    if (user[0]) {
      // TODO: encrypt and decrypt password
      let checkPassword = user[0].password === password;
      if (checkPassword) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: new Date(),
          email: user[0].email,
        };

        const token = jwt.sign(data, jwtSecretKey);
        userData = {
          data: {
            token: token,
          },
        };
      } else {
        userData = {
          error: {
            errorCode: 3,
            message: `Login failed! Please try again.`,
          },
        };
      }
    } else {
      userData = {
        error: {
          errorCode: 2,
          message: `User not found!`,
        },
      };
    }
  } else {
    userData = {
      error: {
        errorCode: 2,
        message: `User not found!`,
      },
    };
  }

  return userData;
};

let checkEmailExist = async (email) => {
  let [user, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `email` = ?",
    [email]
  );
  return user[0] ? true : false;
};

module.exports = {
  handleUserLogin,
  checkEmailExist,
};
