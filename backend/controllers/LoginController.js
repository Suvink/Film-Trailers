const userController = require("../models/registration");
const HashPasswordx = require("../security/hashing");

const Login = async (req, res) => {
  try {
    const { username, password, logged } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ Alert: `Username or password not provided` });

    const userValidity = await userController.findOne({ username: username });
    if (!userValidity) {
      return res.status(404).json({ Alert: `${username} Invalid Username` });
    } else {
      const secure = new HashPasswordx();
      const findOut = secure.compare(userValidity, password);

      if (!findOut) return res.status(400).json({ Alert: "Invalid password" });
      // if (logged) {
      //   await res.cookie(username, password, { maxAge: 60000 }); //storing user login creds in their system for an hour
      // }
      await res.cookie(username, password, { maxAge: 60000 });
      return res.status(200).json({
        Alert: `${username} logged in!`,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { Login };
