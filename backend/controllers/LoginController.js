const userController = require("../models/registration");
const HashPasswordx = require("../security/hashing");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ Alert: `Username or password not provided` });

    const userValidity = await userController.findOne({ username: username });
    if (!userValidity) {
      return res.status(403).json({ Alert: `${username} Invalid Username` });
    } else {
      const secure = new HashPasswordx();
      const passwordMatch = secure.compare(userValidity.password, password);

      if (!passwordMatch)
        return res.status(404).json({ Alert: "Invalid password" });

      // Store user information in the session
      req.session.user = { username, password };

      console.log(
        req.session.user
          ? `The user is -> ${JSON.stringify(req.session.user)}` //shows sesssion username and password!
          : "Unauthenticated!"
      );

      return res.status(200).json({
        Alert: `${username} logged in!`,
      });
    }
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error-handling middleware
  }
};

const status = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: "Authenticated", user: req.session.user });
  } else {
    res.status(401).json({ message: "Not Authenticated!" });
  }
};

module.exports = { Login, status };
