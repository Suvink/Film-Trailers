const RateLimiter = require("express-rate-limiter");

const limiter = new RateLimiter({
  db: "mongodb+srv://deranged248:derangedfrfrlmao@deranged.bvcwyla.mongodb.net/Videos?retryWrites=true&w=majority",
  max: 100,
  duration: 60000,
});

module.exports = limiter;
