// Import the JWT package
const jwt = require('jsonwebtoken');

// Import our custom error
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddelware = async (req, res, next) => {
  // Catch the authorisation token that the user sent
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError(
      'Authentication failed. Invalid credentials (no token provided) 😬',
      403
    );
  }

  // Verification of the token validity
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;

    // Setting the user object property on the request object
    req.user = { id, username };

    // if every thing is okay in the first part of this try block, I'm passing the user onwards by calling next()
    next();
  } catch (error) {
    throw new CustomAPIError(
      'You are not authorized to access this route 😠',
      401
    );
  }
};

module.exports = authenticationMiddelware;
