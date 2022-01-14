import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const connectUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //User finden
    const findUser = await User.findOne({ username });
    //Checken, ob PW korrekt
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUser.password
    );
    //Falls ja token kreieren und zurückschicken
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { username: findUser.username, admin: findUser.admin },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .set("x-authorization-token", token)
        .redirect("admin");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { username: newUser.username, admin: newUser.admin },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .set("x-authorization-token", token)
      .redirect("admin");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
