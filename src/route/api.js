import express from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import auth from "../middleware/auth";

let router = express.Router();

const initApiRoute = (app) => {
  router.post("/login", authController.login);

  // User Management
  router.get("/users", userController.getAllUsers);

  router.post("/user", userController.addUser);

  router.get("/user/:id", userController.detailUser);

  router.put("/user/:id", userController.updateUser);

  router.delete("/user/:id", userController.deleteUser);

  return app.use("/api/v1", router);
};

export default initApiRoute;
