const RateLimiter = require("express-rate-limiter");

const limiter = new RateLimiter({
<<<<<<< HEAD
  db: "mongodb+srv://deranged248:derangedfrfrlmao@deranged.bvcwyla.mongodb.net/Videos?retryWrites=true&w=majority",
=======
  db: "CLUSTER STRING",
>>>>>>> a6004c123f81a6ba6027a84851764b4d9950755e
  max: 100,
  duration: 60000,
});

module.exports = limiter;
