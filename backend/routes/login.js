const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");

// function generateAccessToken(user) {
//   const payload = {
//     id: user.id,
//     email: user.email,
//   };

//   const secret = "your-secret-key";
//   const options = { expiresIn: "1h" };

//   return jwt.sign(payload, secret, options);
// }

// function verifyAccessToken(token) {
//   const secret = "your-secret-key";

//   try {
//     const decoded = jwt.verify(token, secret);
//     return { success: true, data: decoded };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   const result = verifyAccessToken(token);

//   if (!result.success) {
//     return res.status(403).json({ error: result.error });
//   }

//   req.user = result.data;
//   next();
// }

router.route("/").post(loginController.Login);

module.exports = router;
