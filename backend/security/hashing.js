const bcrypt = require("bcrypt");

class HashPasswordx {
  hashPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  compare(userValidity, password) {
    if (!userValidity || !userValidity.password) {
      return "Invalid user data";
    }

    const passwordValidity = bcrypt.compareSync(
      password,
      userValidity.password
    );

    if (!passwordValidity) {
      return false;
    }

    return true;
  }
}

module.exports = HashPasswordx;
