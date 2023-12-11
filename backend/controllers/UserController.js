const userSchema = require("../models/registration");
const bcrypt = require("bcrypt");

async function GetUsers(req, res) {
  const users = await userSchema.find();
  res.json(users);
}

async function CreateUser(req, res) {
  const { username, password, mail } = req.body;

  if (!username || !password || !mail)
    return res
      .status(400)
      .json({ Alert: "No Username/password or mail provided" });

  const findUser = await userSchema.findOne({
    $or: [{ username: username }, { mail: mail }],
  });

  if (!findUser) {
    const hashedPWD = bcrypt.hashSync(password, 10);
    const newUser = new userSchema({
      username,
      password: hashedPWD,
      mail,
    });
    await newUser.save();
    return res.status(201).json({ Alert: `${username} Saved` });
  } else {
    return res
      .status(400)
      .json({ Alert: `${username} or ${mail} already taken` });
  }
}

module.exports = { CreateUser, GetUsers };
