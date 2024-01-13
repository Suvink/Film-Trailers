// const express = require("express");
// const router = express.Router();
// const { auth, db } = require("../config/firebaseConfig");
// const { getDocs, collection, addDoc } = require("firebase/firestore");
// const { createUserWithEmailAndPassword } = require("firebase/auth");

// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "items"));
//       const userData = querySnapshot.docs.map((doc) => doc.data());
//       res.json(userData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   })
//   .post(async (req, res) => {
//     const { mail, password } = req?.body;
//     if (!password || !mail) {
//       return res
//         .status(400)
//         .json({ Alert: "No username or password provided" });
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         mail,
//         password
//       );

//       const userDocRef = await addDoc(collection(db, "users"), {
//         uid: userCredential.user.uid,
//         email: mail,
//       });

//       const createdUser = {
//         uid: userCredential.user.uid,
//         email: mail,
//       };

//       res.json({ message: "User created successfully", user: createdUser });
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

// module.exports = router;
