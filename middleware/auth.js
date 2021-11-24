const jwt = require('jsonwebtoken')

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization;
    let decoded;

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    else {
      try {
        decoded = jwt.verify(token,secret);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
    }

    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;

