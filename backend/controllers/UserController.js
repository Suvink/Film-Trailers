const userSchema = require("../models/registration");
const HashPassword = require("../security/hashing");

async function GetUsers(req, res) {
  const users = await userSchema.find();
  res.json(users);
}

async function CreateUser(req, res) {
  const { username, password, mail, photo } = req?.body;

  if (!username || !password || !mail)
    return res
      .status(400)
      .json({ Alert: "No Username/password or mail provided" });

  const findUser = await userSchema.findOne(
    {
      $or: [{ username: username }, { mail: mail }],
    },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );

  if (!findUser) {
    const x = new HashPassword();
    const encrypted = x.hashPass(password);
    const newUser = new userSchema({
      username,
      password: encrypted,
      mail,
      photo,
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
