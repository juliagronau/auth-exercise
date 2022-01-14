import express from "express";
import path from "path";
import { connectUser, signUp } from "../controllers/user.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jwtRouter = express.Router();

jwtRouter.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public", "login.html"));
});
jwtRouter.post("/connect", connectUser);
jwtRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "signup.html"));
});
jwtRouter.post("/createAccount", signUp)
jwtRouter.get("/admin", (req, res) => {
  res.send("<h1>Willkommen im Admin Panel</h1>");
});

export default jwtRouter;
