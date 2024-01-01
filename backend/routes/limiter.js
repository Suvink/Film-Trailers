const RateLimiter = require("express-rate-limiter");

const limiter = new RateLimiter({
  max: 50,
  duration: 1000, //50 reconds every second (1000ms)
});

module.exports = limiter;
