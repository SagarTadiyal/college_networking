import express from "express";
import {
  createUser,
  fetchAllUsers,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";

const Router = express.Router();

Router.post("/create", createUser);
Router.post("/login", userLogin);
Router.get("/logout", userLogout);
Router.get("/", fetchAllUsers);

export default Router;
