const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const {
  getAnalytics,
  isSupported: isAnalyticsSupported,
} = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyDM-6bHvaTc5BUOaj_svTyKERu4rtZIb1g",
  authDomain: "veloxal.firebaseapp.com",
  projectId: "veloxal",
  storageBucket: "veloxal.appspot.com",
  messagingSenderId: "572095969172",
  appId: "1:572095969172:web:0f580ccce8842169a94181",
  measurementId: "G-TH6278CMTF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { db };
