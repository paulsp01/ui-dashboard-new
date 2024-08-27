// // /backend/controllers/productController.js
// const { db } = require("../config/firebaseConfig");
 const { getDoc, collection ,doc} = require("firebase/firestore");
 //const { admin, db ,auth} = require("../config/firebaseConfig");

// // Add Product
// exports.addProduct = async (req, res) => {
//   const { productName, productDescription, productPrice } = req.body;

//   try {
//     await addDoc(collection(db, "products"), {
//       productName,
//       productDescription,
//       productPrice,
//       createdAt: new Date().toISOString(),
//     });

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// productController.js

const admin = require("firebase-admin");

// Ensure Firestore is initialized correctly
const db = admin.firestore();

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    console.log("req.body",req.body);

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }
   
    const newProduct = {
      name,
      description,
      price,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Use the correct method to add a document to Firestore
    // const productRef = await db.collection("products").add(newProduct);

    console.log("newProduct",newProduct);


     const productRef=await admin.firestore().collection("products").add(newProduct);

     console.log("productRef",productRef.id);

    res.status(201).json({
      message: "Product added successfully!",
      productId: productRef.id,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Error adding product.", error: error.message });
  }
};




// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const productDoc = doc(db, "products", id);
//     const productSnapshot = await getDoc(productDoc);

//     if (!productSnapshot.exists()) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     await deleteDoc(productDoc);

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// };




exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params",req.params)

    // Reference the document in Firestore using the id
    const productDoc = db.collection("products").doc(id);
    console.log("productDoc", productDoc);
    // Check if the product exists in Firestore
    const productSnapshot = await productDoc.get();
   console.log("productSnapshot", productSnapshot);
    if (!productSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the document from Firestore
    await productDoc.delete();

    // Respond with success
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Log detailed error
    console.error("Error deleting product:", error);

    // Send 500 Internal Server Error response with detailed message
    res
      .status(500)
      .json({ error: "Failed to delete product", details: error.message });
  }
};


// Controller to update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const productDoc = db.collection("products").doc(id);
     const productSnapshot = await productDoc.get();
    if (!productSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedData = {};

    if (name) updatedData.name = name;
    if(description) updatedData.description=description;
    if (price) updatedData.price = parseFloat(price);

    //await updateDoc(productDoc, updatedData);
    await productDoc.update(updatedData);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};




exports.getAllProducts = async (req, res) => {
  try {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);

    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};



exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      res
        .status(200)
        .json({ id: productSnapshot.id, ...productSnapshot.data() });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};