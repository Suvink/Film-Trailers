const userController = require("../models/registration");
const HashPasswordx = require("../security/hashing");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ Alert: `Username or password not provided` });

    const userValidity = await userController
      .findOne({ username: username })
      .exec();

    if (!userValidity) {
      return res.status(403).json({ Alert: `${username} Invalid Username` });
    } else {
      const secure = new HashPasswordx();
      const passwordMatch = await secure.compare(
        password,
        userValidity.password
      );

      if (!passwordMatch)
        return res.status(404).json({ Alert: "Invalid password" });

      // Set the "user" cookie to be sent in the response
      res.cookie("user", { username, password }, { maxAge: 60000 });

      return res.status(200).json({
        Alert: `${username} logged in!`,
      });
    }
  } catch (err) {
    console.error(err);
  }
  next();
  status();
};

const status = (req, res) => {
  // Check if the "user" cookie is present in the request
  if (req.cookies.user) {
    console.log("Load back!");
  } else {
    console.log("Cannot Load!");
  }
};

module.exports = { Login, status };
