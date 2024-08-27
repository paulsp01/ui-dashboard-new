// // /src/config/firebaseConfig.js
// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");
// const { getAuth } = require("firebase/auth");

// const firebaseConfig = {
//   apiKey: "AIzaSyCy5GVEmDs8pTodcPPiBK3AomSPY-B7rwM",
//   authDomain: "ui-dashboard-145da.firebaseapp.com",
//   projectId: "ui-dashboard-145da",
//   storageBucket: "ui-dashboard-145da.appspot.com",
//   messagingSenderId: "668129028910",
//   appId: "1:668129028910:web:e9133e719dd001b71c28bf",
//   measurementId: "G-2YTFMJKQ9M",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Auth (if needed)
// const auth = getAuth(app);

// module.exports = { db, auth };
// Import required Firebase and Firestore services
// Import required Firebase Admin SDK components
// const admin = require('firebase-admin');

// // Import Firebase client SDK components (for client-side usage)
// const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const { getAuth } = require('firebase-admin/auth');
// const { getFirestore } = require('firebase-admin/firestore');

// // Initialize Firebase Admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),  // Use applicationDefault() if credentials are set up in the environment
//     // For specific credentials, use:
//      credential: admin.credential.cert(require('../../serviceAccountKey.json')),
//     //databaseURL: "https://<your-database-name>.firebaseio.com"  // Replace with your Firebase database URL
//   });
// }

// // Export Firebase Admin services
// const auth = getAuth();
// const db = getFirestore();

// module.exports = { admin, auth, db };

// Note: If you're using Firebase client SDKs (in your frontend), use the following configuration:

// For client-side configuration, ensure to import Firebase client SDKs in your frontend files
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// Firebase client configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCy5GVEmDs8pTodcPPiBK3AomSPY-B7rwM",
//   authDomain: "ui-dashboard-145da.firebaseapp.com",
//   projectId: "ui-dashboard-145da",
//   storageBucket: "ui-dashboard-145da.appspot.com",
//   messagingSenderId: "668129028910",
//   appId: "1:668129028910:web:e9133e719dd001b71c28bf",
//   measurementId: "G-2YTFMJKQ9M",
// };

// Initialize Firebase (client-side)
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// const db = getFirestore(app);




// firebaseConfig.js

const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth, createUser, verifyIdToken } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('../../serviceAccountKey.json')),
  });
}

const auth = getAuth();
const db = getFirestore();

module.exports = { admin, db, auth };
