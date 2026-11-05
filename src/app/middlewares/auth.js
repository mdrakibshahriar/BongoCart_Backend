const jwt = require("jsonwebtoken");

const auth =
  (...requireRole) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Unauthorized: Access token not found!",
        });
      }
      let verifiedUser = null;
      try {
        verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
      } catch (error) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Invalid Access token!",
        });
      }
      if (requireRole.length && !requireRole.includes(verifiedUser.role)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "Forbidden",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = auth;
