import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy5GVEmDs8pTodcPPiBK3AomSPY-B7rwM",
  authDomain: "ui-dashboard-145da.firebaseapp.com",
  projectId: "ui-dashboard-145da",
  storageBucket: "ui-dashboard-145da.appspot.com",
  messagingSenderId: "668129028910",
  appId: "1:668129028910:web:e9133e719dd001b71c28bf",
  measurementId: "G-2YTFMJKQ9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const googleProvider = new GoogleAuthProvider();
//const googleProvider = new firebase.auth.GoogleAuthProvider();

// Google Sign-In
// document.getElementById("googleSignIn")?.addEventListener("click", () => {
//   signInWithPopup(auth, googleProvider)
//     .then((result) => {
//       const user = result.user;
//       console.log("Google Sign-In successful:", user);
//       window.location.href = "product.html";
//     })
//     .catch((error) => {
//       console.error("Error during Google sign-in:", error.message);
//       alert("Google sign-in error: " + error.message);
//     });
// });
    
// document.addEventListener("DOMContentLoaded", () => {
//   document
//     .getElementById("googleSignIn")
//     .addEventListener("click", async () => {
//       try {
//         // Sign in with Google
//         const result = await signInWithPopup(auth, googleProvider);

//         // Obtain the ID token from the signed-in user
//         const idToken = await result.user.getIdToken();
//         console.log("ID Token:", idToken); // Logs the ID token in the browser console

//         // Send the ID token to your backend for validation and to set cookies
//         const response = await fetch(
//           "http://localhost:5000/auth/google-signin",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ idToken }),
//           }
//         );
//         const data = await response.json();
//         if (data) {
//           // Handle successful login (e.g., redirect to another page)
//           window.location.href = "product.html";
//         } else {
//           const errorData = await response.json();
//           console.error("Backend error:", errorData.error);
//           alert("Google Sign-In failed: " + errorData.error);
//         }
//       } catch (error) {
//         console.error("Error during Google Sign-In:", error.message);
//         alert("Google sign-in error: " + error.message);
//       }
//     });

//   // Sign-up Form Submission
//   document
//     .getElementById("signupForm")
//     ?.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const username = document.getElementById("username").value.trim();
//       const email = document.getElementById("email").value.trim();
//       const password = document.getElementById("password").value.trim();

//       if (!username || !email || !password) {
//         alert("All fields are required!");
//         return;
//       }

//       try {
//         // Send the signup data to your backend
//         const response = await fetch("http://localhost:5000/auth/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, email, password }), // Send password
//         });

//         const data = await response.json();

//         if (data.success) {
//           alert("Signup successful! Redirecting to login...");
//           window.location.href = "login.html";
//         } else {
//           alert("Signup failed: " + (data.error || "Unknown error"));
//         }
//       } catch (error) {
//         console.error("Error during sign-up:", error.message);
//         alert("Sign-up error: " + error.message);
//       }
//     });

//   // Login Form Submission
//   // document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
//   //   e.preventDefault();

//   //   const email = document.getElementById("email").value.trim();
//   //   const password = document.getElementById("password").value.trim();

//   //   if (!email || !password) {
//   //     alert("Email and password are required.");
//   //     return;
//   //   }

//   //   try {
//   //     // Sign in with Firebase
//   //     const userCredential = await signInWithEmailAndPassword(
//   //       auth,
//   //       email,
//   //       password
//   //     );
//   //     const user = userCredential.user;

//   //     console.log("User email:", user.email);
//   //     console.log("Firebase UID:", user.uid);

//   //     // Get the ID token
//   //     const idToken = await user.getIdToken();

//   //     // Send the ID token to your backend
//   //     const response = await fetch("http://localhost:5000/auth/login", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ idToken }), // Send the ID token
//   //     });

//   //     const data = await response.json();

//   //     if (data) {
//   //       console.log("Login successful:", data);
//   //       alert("Login successful! Redirecting to the add product page...");
//   //       window.location.href = "product.html";
//   //     } else {
//   //       alert("Login failed: " + (data.error || "Unknown error"));
//   //        window.location.href = "signup.html";
//   //     }
//   //   } catch (error) {
//   //     // Error handling for both network and Firebase Auth issues
//   //     console.error("Error during login:", error.message);

//   //     if (error.message.includes("user-not-found")) {
//   //       alert("User not found. Please sign up.");
//   //       window.location.href = "signup.html";
//   //     } else if (error.message.includes("wrong-password")) {
//   //       alert("Incorrect password. Please try again.");
//   //     } else {
//   //       alert("Error during login: " + error.message);
//   //     }
//   //   }

//   // });

//   // Frontend: signin.js
//   document
//     .getElementById("loginForm")
//     ?.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const email = document.getElementById("email").value.trim();
//       const password = document.getElementById("password").value.trim();

//       if (!email || !password) {
//         alert("Email and password are required.");
//         return;
//       }

//       try {
//         // Send email and password directly to the backend for authentication
//         const response = await fetch("http://localhost:5000/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (data) {
//           console.log("Login successful:", data);
//           alert("Login successful! Redirecting to the add product page...");
//           window.location.href = "product.html";
//         } else {
//           alert("Login failed: " + (data.error || "Unknown error"));
//           window.location.href = "signup.html";
//         }
//       } catch (error) {
//         console.error("Error during login:", error.message);
//         alert("Error during login: " + error.message);
//       }
//     });
// });
























document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("googleSignIn")
    ?.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        console.log("ID Token:", idToken);

        const response = await fetch(
          "http://localhost:5000/auth/google-signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await response.json();
        if (data) {
          window.location.href = "product.html";
        } else {
          const errorData = await response.json();
          console.error("Backend error:", errorData.error);
          alert("Google Sign-In failed: " + errorData.error);
        }
      } catch (error) {
        console.error("Error during Google Sign-In:", error.message);
        alert("Google sign-in error: " + error.message);
      }
    });

  document
      .getElementById("signupForm")
      ?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !email || !password) {
          alert("All fields are required!");
          return;
        }

        try {
          // Send the signup data to your backend
          const response = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }), // Send password
          });

          const data = await response.json();

          if (data.success) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
          } else {
            alert("Signup failed: " + (data.error || "Unknown error"));
          }
        } catch (error) {
          console.error("Error during sign-up:", error.message);
          alert("Sign-up error: " + error.message);
        }
      });

  document
    .getElementById("loginForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("Email and password are required.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data) {
          console.log("Login successful:", data);
          alert("Login successful! Redirecting to the add product page...");
          window.location.href = "product.html";
        } else {
          alert("Login failed: " + (data.error || "Unknown error"));
          window.location.href = "signup.html";
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        alert("Error during login: " + error.message);
      }
    });
});
