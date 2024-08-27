// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
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

// Function to handle form submission
document.getElementById("submitProduct").addEventListener("click", async () => {
  const productId = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const description = document.getElementById("productDescription").value;

  if (!productId || !name || isNaN(price) || !description) {
    alert("Please fill out all fields correctly.");
    return;
  }

  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      name: name,
      price: price,
      description: description,
    });

    alert("Product updated successfully.");

    // Redirect to dashboard
    window.location.href = "manage-products.html";
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
});

// Function to handle form cancellation
document.getElementById("cancelProduct").addEventListener("click", () => {
  window.location.href = "manage-products.html";
});

// Function to populate the form with existing product data
function populateForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productName = urlParams.get("name");
  const productPrice = urlParams.get("price");
  const productDescription = urlParams.get("description");

  if (productId) {
    document.getElementById("productId").value = productId;
    document.getElementById("productName").value = productName;
    document.getElementById("productPrice").value = productPrice;
    document.getElementById("productDescription").value = productDescription;
  }
}

// Populate the form with existing data when the page loads
window.onload = populateForm;
