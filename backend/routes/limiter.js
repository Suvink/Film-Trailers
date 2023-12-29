const RateLimiter = require("express-rate-limiter");

const limiter = new RateLimiter({
  db: "CLUSTER STRING",
  max: 100,
  duration: 60000,
});

module.exports = limiter;
