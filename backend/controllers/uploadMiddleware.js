// const multer = require("multer");

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// }).single("photo");

// function uploadMiddleware(req, res, next) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ error: "Multer error", details: err.message });
//     } else if (err) {
//       return res.status(500).json({
//         error: "Unknown error during file upload",
//         details: err.message,
//       });
//     }

//     next();
//   });
// }

// module.exports = uploadMiddleware;
