import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    const finalToken = token.split(" ")[1];

    const decoded = jwt.verify(
      finalToken,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;