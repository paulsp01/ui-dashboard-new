// Import required Firebase and Firestore services
const { admin, db ,auth} = require("../config/firebaseConfig");
const { setDoc, doc } = require("firebase/firestore");
//const admin = require("firebase-admin");
const FIREBASE_API_KEY = "AIzaSyCy5GVEmDs8pTodcPPiBK3AomSPY-B7rwM";
const axios = require("axios");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../../serviceAccountKey.json")),
  });
}

// Signup Controller
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create the user in Firebase Auth using Admin SDK
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username,
    });

    // Store user information in Firestore
    // await db.collection("users").doc(userRecord.uid).set({ username, email });
     await admin.firestore().collection("users").doc(userRecord.uid).set({
       username: username,
       email: email,
     });
    // Respond with success message
    // res.status(201).json({
    //   success: true,
    //   message: "User created and stored successfully",
    //   user: { uid: userRecord.uid, email: userRecord.email },
    // });

     res.status(201).json({
       success: true,
       message: "User created successfully",
       user: {
         uid: userRecord.uid,
         email: userRecord.email,
         displayName: userRecord.displayName,
       },
     });
  } catch (error) {
    // Handle errors related to user creation
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
};


// Login Controller
 // Ensure you have initialized Firebase Admin SDK
 // Import your Firebase config

// Initialize Firebase Admin if not already done
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

// exports.login = async (req, res) => {
//   const { idToken } = req.body;

//   console.log("Received login request with ID token"); // Debug log

//   console.log("req.body", req.body);

//   if (!idToken) {
//     return res.status(400).json({ error: "Missing ID token" });
//   }

//   try {
//     // Verify the ID token with Firebase Admin
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     console.log("Firebase token verification successful:", decodedToken);

//     // Get user details
//     const userInfo = {
//       uid: decodedToken.uid,
//       email: decodedToken.email,
//     };
//     console.log("userInfo", userInfo);

//     // Set session cookie with user information
//     res.cookie(
//       "session ",
//       JSON.stringify({
//         uid: decodedToken.uid,
//         email: decodedToken.email,
//       }),
//       {
//         httpOnly: true, // Prevent JavaScript access to the cookie
//         secure: true, // Use secure cookies in production
//         maxAge: 3600000, // Cookie expires in 1 hour (1 hour = 3600000 milliseconds)
//         sameSite: "None", // Adjust based on your needs
//       }
//     );
//      console.log("Setting cookie with:", {
//        uid: decodedToken.uid,
//        email: decodedToken.email,
//      });
//     // Send response back to client
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         uid: decodedToken.uid,
//         email: decodedToken.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during token verification:", error);
//     res.status(500).json({ error: "Failed to verify token" });
//   }
// };




// Backend: authController.js
exports.login = async (req, res) => {
   const { email, password } = req.body;

  try {
    // Authenticate with Firebase Authentication REST API
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    // Extract user data
    const { localId, email: userEmail } = response.data;

    // Set custom session cookie or handle user session here
    res.cookie("session", JSON.stringify({ uid: localId, email: userEmail }), {
      httpOnly: false,
      secure: false, // Use secure cookies in production
      maxAge: 3600000, // 1 hour
      sameSite: "Lax",
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        uid: localId,
        email: userEmail,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


};



// Logout Controller
exports.logout = async (req, res) => {
  try {
    // Clear the session cookie
    res.clearCookie("session", {
      httpOnly: true,
      secure: true, // Match the settings used in login
      sameSite: "None",
    });

    // Respond with success message
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    // Handle errors related to sign-out
    console.error("Logout error:", error.message);
    res.status(500).json({ error: "Failed to log out" });
  }
};






exports.googleSignIn = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Set session cookie or handle user session
    res.cookie("session", JSON.stringify({ uid, email }), {
      httpOnly: false,
      secure: false,
      maxAge: 3600000, // 1 hour
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Google Sign-In successful",
      user: {
        uid,
        email,
      },
    });
  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    res.status(400).json({
      error: "Failed to sign in with Google: " + error.message,
    });
  }
};
