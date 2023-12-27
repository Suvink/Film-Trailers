const bcrypt = require("bcrypt");

class HashPasswordx {
  hashPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
}

module.exports = HashPasswordx;
