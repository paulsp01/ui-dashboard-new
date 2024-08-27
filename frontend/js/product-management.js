// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
// } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// // Firebase configuration (Replace with your config)
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
// const db = getFirestore(app);

// // Function to fetch and display products
// async function fetchAndDisplayProducts() {
//   const productsContainer = document.getElementById("productsContainer");
//   const productsRef = collection(db, "products"); // 'products' is the Firestore collection

//   try {
//     const productsSnapshot = await getDocs(productsRef);

//     // Clear existing content
//     productsContainer.innerHTML = "";

//     // Loop through each document and create an HTML element for each product
//     productsSnapshot.forEach((doc) => {
//       const product = doc.data();

//       // Create product element
//       const productElement = document.createElement("div");
//       productElement.className = "product";
//       productElement.innerHTML = `
//         <h3>${product.name}</h3>
//         <p>Description: ${product.description}</p>
//         <p>Price: $${product.price}</p>
//         <button class="deleteButton" data-id="${doc.id}">Delete</button>
//         <button class="updateButton" data-id="${doc.id}" data-name="${product.name}" data-price="${product.price}" data-description="${product.description}">Update</button>
//       `;

//       // Append the product element to the container
//       productsContainer.appendChild(productElement);
//     });

//     // Attach event listeners
//     attachDeleteListeners();
//     //attachUpdateListeners();
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

// // Function to attach delete button event listeners
// function attachDeleteListeners() {
//   const deleteButtons = document.querySelectorAll(".deleteButton");
//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", async (e) => {
//       const productId = button.getAttribute("data-id");
//       await deleteProduct(productId, button);
//     });
//   });
// }

// // Function to delete a product
// async function deleteProduct(productId, buttonElement) {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/products/${productId}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (response.ok) {
//       // Remove the product from the DOM
//       const productElement = buttonElement.closest(".product");
//       productElement.remove();

//       alert("Product deleted successfully.");
//     } else {
//       const errorData = await response.json();
//       alert("Failed to delete product: " + errorData.error);
//     }
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     alert("Error deleting product: " + error.message);
//   }
// }

// // Function to attach update button event listeners






























// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration (Replace with your config)
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
const db = getFirestore(app);

// Function to fetch and display products
async function fetchAndDisplayProducts() {
  const productsContainer = document.getElementById("productsContainer");
  const productsRef = collection(db, "products"); // 'products' is the Firestore collection

  try {
    const productsSnapshot = await getDocs(productsRef);

    // Clear existing content
    productsContainer.innerHTML = "";

    // Loop through each document and create an HTML element for each product
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
           
      // Create product element
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Description: ${product.description}</p>
        <p>Price: $${product.price}</p>
        <button class="deleteButton" data-id="${doc.id}">Delete</button>
        <button class="updateButton" data-id="${doc.id}">Update</button>
      `;

      // Append the product element to the container
      productsContainer.appendChild(productElement);
    });

    // Attach event listeners
    attachDeleteListeners();
    attachUpdateListeners(); // Attach update listeners
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to attach delete button event listeners
function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const productId = button.getAttribute("data-id");
      await deleteProduct(productId, button);
    });
  });
}

// Function to delete a product
async function deleteProduct(productId, buttonElement) {
  try {
    const response = await fetch(
      `http://localhost:5000/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Remove the product from the DOM
      const productElement = buttonElement.closest(".product");
      productElement.remove();

      alert("Product deleted successfully.");
    } else {
      const errorData = await response.json();
      alert("Failed to delete product: " + errorData.error);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product: " + error.message);
  }
}

// Function to attach update button event listeners
// Function to attach update button event listeners
function attachUpdateListeners() {
  const updateButtons = document.querySelectorAll(".updateButton");
  updateButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = button.getAttribute("data-id");
      const name = button.getAttribute("data-name");
      const price = button.getAttribute("data-price");
      const description = button.getAttribute("data-description");

      // Redirect to update page with query parameters
      window.location.href = `update-product.html?id=${productId}&name=${encodeURIComponent(name)}&price=${price}&description=${encodeURIComponent(description)}`;
    });
  });
}

// Call attachUpdateListeners() after fetching products
// window.onload = function() {
//   fetchAndDisplayProducts();
// };


// Load products when the page loads
window.onload = fetchAndDisplayProducts;
