
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
//const isAuthenticated = require("./middileware/authMiddleware");
const cookieMiddleware=require("./middileware/cookieMiddleware");
const cors = require("cors");
const axios=require("axios");

const app = express();

app.use(bodyParser.json());
//app.use(cookieMiddleware); 

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend")));


app.use("/auth",authRoutes);
app.use("/products",cookieMiddleware, productRoutes);

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust according to your frontend's origin
    credentials: true, // Allow cookies to be sent
  })
);
app.get("/product.html", cookieMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/product.html"));
});
app.get("/test-cookie", (req, res) => {
  res.cookie("test", "cookieValue", { httpOnly: true });
  res.send("Cookie set");
});

app.get("/dashboard", cookieMiddleware, (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT =  5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
