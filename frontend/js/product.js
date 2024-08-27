// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import {
//   getAuth,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// // Firebase configuration
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
// const auth = getAuth(app);

// document.addEventListener("DOMContentLoaded", () => {
//   // Check for authentication state
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log("User is logged in:", user);
//     } else {
//       // Redirect to login page if the user is not authenticated
//       window.location.href = "login.html";
//     }
//   });

//   // Handle form submission for adding a product
//   document
//     .getElementById("productForm")
//     ?.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       // Get product details from the form
//       const productName = document.getElementById("productName").value.trim();
//       const productDescription = document
//         .getElementById("productDescription")
//         .value.trim();
//       const productPrice = document.getElementById("productPrice").value.trim();

//       // Basic form validation
//       if (!productName || !productDescription || !productPrice) {
//         alert("All fields are required.");
//         return;
//       }

//       const user = auth.currentUser;

//       if (user) {
//         try {
//           // Get the user's ID token for authorization
//           const token = await user.getIdToken();

//           // Send product data to the backend API
//           const response = await fetch("http://localhost:5000/products/add", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               productName,
//               productDescription,
//               productPrice,
//             }),
//           });

//           // Parse the response from the backend
//           const data = await response.json();

//           if (response.ok) {
//             alert("Product added successfully!");
//             // Reset the form and redirect to home page or dashboard
//             document.getElementById("productForm").reset();
//             window.location.href = "index.html";
//           } else {
//             alert("Error adding product: " + (data.error || "Unknown error"));
//           }
//         } catch (error) {
//           console.error("Network error:", error.message);
//           alert("Network error: " + error.message);
//         }
//       } else {
//         // If no user is logged in, redirect to login page
//         window.location.href = "login.html";
//       }
//     });
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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



  // Handle form submission for adding a product
   document
     .getElementById("productForm")
     ?.addEventListener("submit", async (e) => {
       e.preventDefault();

       // Get product details from the form
       const name = document.getElementById("productName").value.trim();
       const description = document
         .getElementById("productDescription")
         .value.trim();
       const price = document.getElementById("productPrice").value.trim();

       // Basic form validation
       if (!name || !description || !price) {
         alert("All fields are required.");
         return;
       }

       const user = auth.currentUser;

       if (user) {
         try {
           // Get the user's ID token for authorization
           const token = await user.getIdToken();
           console.log("token", token);

           // Send product data to the backend API
           const response = await fetch("http://localhost:5000/products/add", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
             body: JSON.stringify({
               name, // Match field names with backend
               description, // Match field names with backend
               price, // Match field names with backend
             }),
           });

           // Parse the response from the backend
           const data = await response.json();
           console.log(data);

           if (data) {
             alert("Product added successfully!");
             // Reset the form and redirect to home page or dashboard
             document.getElementById("productForm").reset();
             window.location.href = "manage-products.html";
           } else {
             alert("Error adding product: " + (data.error || "Unknown error"));
           }
         } catch (error) {
           console.error("Network error:", error.message);
           alert("Network error: " + error.message);
         }
       } else {
         // If no user is logged in, redirect to login page
         window.location.href = "login.html";
       }
     });



     document.addEventListener("DOMContentLoaded", () => {
       function checkSessionCookie() {
         // Get all cookies
         const cookies = document.cookie.split("; ");
         console.log("All cookies:", cookies);

         // Find the cookie that contains the session data
         const sessionCookie = cookies.find((cookie) => {
           return cookie.startsWith("session=");
         });

         console.log("Session cookie found:", sessionCookie);

         if (!sessionCookie) {
           alert("You are not logged in. Redirecting to login...");
           window.location.href = "login.html";
         } else {
           // Extract and decode the cookie value
           const sessionValue = sessionCookie.split("=")[1];
           const decodedValue = decodeURIComponent(sessionValue);

           try {
             // Parse JSON data
             const sessionData = JSON.parse(decodedValue);

             console.log("Session cookie value:", sessionData);

             // Check user data or perform other logic
             if (sessionData && sessionData.uid) {
               console.log("User ID:", sessionData.uid);
               console.log("User Email:", sessionData.email);
               // User is logged in, proceed as needed
             } else {
               alert("Session data is not valid. Redirecting to login...");
               window.location.href = "login.html";
             }
           } catch (error) {
             console.error("Error parsing session cookie:", error);
             alert("Error with session data. Redirecting to login...");
             window.location.href = "login.html";
           }
         }
       }

       checkSessionCookie();
     });




document.getElementById("addProductButton").addEventListener("click", () => {
  // Redirect to the product.html page
  window.location.href = "product.html";
});


     