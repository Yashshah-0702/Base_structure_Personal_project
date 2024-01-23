const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.TOKEN_EXPIRED
      );
    }
    const jwtToken = token.split(" ")[1];
    const tokenExpiry = jwt.verify(jwtToken, "somesupersecretsecret");
    //   if(!tokenExpiry){
    //     return failure(
    //       res,
    //       httpsStatusCodes.UNAUTHORIZED,
    //       serverResponseMessage.TOKEN_EXPIRED
    //     );
    //   }
    const userDetails = await User.findOne({
      id: tokenExpiry._id,
    });
    req.user = userDetails;
    next();
  } catch (error) {}
};

module.exports = isAuthenticated;
