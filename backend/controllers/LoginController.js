const userController = require("../models/registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { username, password } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ Alert: `Username or password not provided` });

    const userValidity = await userController.findOne({ username: username });
    if (!userValidity) {
      return res.status(404).json({ Alert: `${username} Invalid Username` });
    } else {
      const passwordValidity = bcrypt.compareSync(
        password,
        userValidity.password
      );
      if (!passwordValidity) {
        return res.status(403).json({ Alert: `Incorrect password` });
      } else {
        const tempoUser = res.cookie(
          "userData",
          { username, password },
          { maxAge: "15000" }
        ); //15 mins
        const accessToken = jwt.sign(
          {
            username: userValidity.username,
            password: userValidity.password,
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "15m",
          }
        );

        res.cookie("jwt", accessToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, //24 hours
        });

        return res.status(200).json({
          Alert: `${username} logged in and your access Token is ${accessToken} testing ${tempoUser}`,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Login };
