const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const webToken = req.cookies.token;
  if (!webToken) return res.status(401).json('Access Denied. Please login.');

  try {
    const decodedToken = jwt.verify(webToken, process.env.JWTSECRET);
    req.user = decodedToken;
    return next();
  } catch (err) {
    const errObj = {
      serverMessage: `Authentication ERROR: ${err.message}`,
      status: 401,
      message: 'Authentication ERROR: Invalid Token. Please login.',
    };
    return next(errObj, req, res, next);
  }
}

module.exports = authenticate;
