import express from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";

let router = express.Router();

const initApiRoute = (app) => {
  router.post("/login", authController.login);

  router.get("/users", userController.getAllUsers);

  // router.post("/users", apiController.addUser);

  // router.get("/users/:id", apiController.detailUser);

  // router.put("/users/:id", apiController.updateUser);

  // router.delete("/users/:id", apiController.deleteUser);

  return app.use("/api/v1", router);
};

export default initApiRoute;
