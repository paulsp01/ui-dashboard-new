// const { admin } = require("../config/firebaseConfig");

// module.exports = async (req, res, next) => {
//   const sessionCookie = req.cookies.session;
//   console.log("sessionCookie",sessionCookie);

//   if (!sessionCookie) {
//      return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const userInfo = JSON.parse(sessionCookie);
//     // Optionally, you can verify this information or fetch user details
//     req.user = userInfo;
//     next();
//   } catch (error) {
//     console.error("Error parsing session cookie:", error);
//     res.status(401).json({ error: "Unauthorized" });
    
//   }
// };


const cookieParser = require("cookie-parser");

const { admin } = require("../config/firebaseConfig");

module.exports = async (req, res, next) => {
  const sessionCookie = req.cookies.session;

  console.log("sessionCookie", sessionCookie);

  if (!sessionCookie) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userInfo = JSON.parse(sessionCookie);
    // Optionally, you can verify this information or fetch user details from Firebase Admin SDK
    req.user = userInfo;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Error parsing session cookie:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

