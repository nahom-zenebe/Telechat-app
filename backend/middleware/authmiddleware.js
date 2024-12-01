const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

module.exports.protectRoute = async (req, res, next) => {
    const token = req.cookies?.JWT; // Access token from cookies

    try {
        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access - No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user by ID
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route

    } catch (error) {
        console.error("Error in protectedRoute middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
