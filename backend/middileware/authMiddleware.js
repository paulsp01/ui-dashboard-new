const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../../serviceAccountKey.json")),
  });
}

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken; // Attach the decoded token (user info) to the request
      next(); // Continue to the next middleware or route handler
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    });
};


