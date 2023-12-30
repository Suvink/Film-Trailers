const userSchema = require("../models/registration");
const HashPassword = require("../security/hashing");

async function GetUsers(req, res) {
  const users = await userSchema.find();
  res.json(users);
}

async function CreateUser(req, res) {
  try {
    const { username, password, mail, photo } = req?.body;

    if (!username || !password || !mail)
      return res
        .status(400)
        .json({ Alert: "No Username/password or mail provided" });

    const findUser = await userSchema.findOne({
      $or: [{ username: username }, { mail: mail }],
    });

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal server error" });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req?.params;
  const convertedID = String(id);
  if (!id) return res.status(400).json({ Alert: "No ID Found" });

  const findId = await userSchema.deleteOne({ _id: convertedID });
  if (!findId) {
    return res.status(400).json({ Alert: "ID not found" });
  } else {
    return res.status(200).json({ Alert: `${id} Deleted` });
  }
};

module.exports = { CreateUser, GetUsers, deleteUser };
