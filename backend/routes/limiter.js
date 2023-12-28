const rateLimit = require("express-rate-limiter");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100, //100 request every minute
});

module.exports = limiter;
