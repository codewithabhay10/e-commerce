const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
    // This middleware checks if the user is logged in by verifying the JWT token.
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
       req.flash("error", "You must be logged in to access this resource");
       return res.redirect("/login");
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
        const user = await userModel.findOne({ email: decoded.email })
        .select("-password"); // Exclude password from the user object
        // If user is not found, return 404 Not Found

        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
    
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// This middleware checks if the user is logged in by verifying the JWT token.