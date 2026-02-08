const express=require('express');
const Router=express.Router();

const authController=require("./Controllers/authController");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // Verify token using jsonwebtoken
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token"
        });
      }

      // Token is valid
      req.user = decoded; // attach decoded payload for later use
      next();             // proceed to protected route
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};






Router.post("/register",authController.register);
Router.post("/login",authController.login);
Router.delete("/deleteData/:id",authController.deleteData);
Router.get("/getData",authController.getData);
Router.post("/logout",verifyToken,authController.logout);
module.exports=Router;