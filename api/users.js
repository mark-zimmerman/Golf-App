const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const bcrypt = require("bcrypt");
const {createUser, getUser} = require("../db/models/usersModel");

// POST /api/users/register

usersRouter.post("/register", async (req, res, next) => {
    const { username, password, email } = req.body;
    console.log('inside reg')
    try {
      //line below not currently being used!!!!!!!
      // const hashedPassword = await bcrypt.hash(password, 10);
      // const _user = await getUser({ username, password });
  
      if (password.length < 8) {
        res.send({
          error: "error",
          message: "Password Too Short!",
          name: "name",
        });
      }
      // if (_user) {
      //   res.send({
      //     error: "error",
      //     message: "User already exists!",
      //     name: "name",
      //   });
      // }
  
      const user = await createUser({ username, password, email });
      // const token = jwt.sign(
      //   { id: user.id, username: user.username },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "1h" }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        "secret",
        { expiresIn: "1h" }
      );
      res.send({
        message: "thank you for signing up",
        token,
        user: user
      });
    } catch ({ name, message }) {
      next({ name, message });

    }
  });
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log('we in login api router', username, password);
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUser({ username });
    if (await bcrypt.compare(password, user.hashedPassword)) {
      const token = jwt.sign(
        { id: user.id, username: user.username }, "secret",
        {expiresIn: "1h"}
      );
      console.log("this is the token", token);
      res.send({token, message:"you're logged in!", username});
    } else {
      next({
        name: "bad information",
        message: "Incorrent username and password",
      })
    }
  } catch (error) {
    next(error);
  }
})
  module.exports = usersRouter;