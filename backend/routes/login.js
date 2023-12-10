const express = require("express");
const router = express.Router();
const userController = require("../models/registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function generateAccessToken(user) {
//   const payload = {
//     id: user.id,
//     email: user.email,
//   };

//   const secret = "your-secret-key";
//   const options = { expiresIn: "1h" };

//   return jwt.sign(payload, secret, options);
// }

// function verifyAccessToken(token) {
//   const secret = "your-secret-key";

//   try {
//     const decoded = jwt.verify(token, secret);
//     return { success: true, data: decoded };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   const result = verifyAccessToken(token);

//   if (!result.success) {
//     return res.status(403).json({ error: result.error });
//   }

//   req.user = result.data;
//   next();
// }

router.route("/").post(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ Alert: `Username or password not provided` });

  const userValidity = await userController.findOne({ username: username });
  if (!userValidity) {
    return res.status(404).json({ Alert: `${username} Invalid Username` });
  } else {
    const passwordValidity = await bcrypt.compareSync(
      password,
      userValidity.password
    );
    if (!passwordValidity) {
      return res.status(403).json({ Alert: `Incorrect password` });
    } else {
      const accessToken = jwt.sign(
        {
          username: userValidity.username,
          password: userValidity.password,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = jwt.sign(
        {
          username: userValidity.username,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        Alert: `${username} logged in and your access Token is ${accessToken}`,
      });
    }
  }
});

module.exports = router;
