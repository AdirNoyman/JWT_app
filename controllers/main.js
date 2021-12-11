// Check username + password in post request (login)
// if exist (registred user), create new JWT
// and then send the JWT back to the front-end
// Setup the authentication in a way that only request with JWT, can get back information/data (access the dashboard)

// Import the JWT package
const jwt = require('jsonwebtoken');

// Import our custom error
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check(validate) in the controller if the user provided username(email) and password
  if (!username || !password) {
    throw new CustomAPIError('Please provide an email and password', 400);
  }

  // This is just a dummy id
  const id = new Date().getDate();

  // Try to keep the payload small as possible for good web performance
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created sucessefuly 😎🤘', token });
};

const dashboard = async (req, res) => {
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

    const luckyNumber = Math.floor(Math.random() * 101);

    res.status(200).json({
      msg: `Hello, ${decoded.username} 🤓`,
      secret: `Here is your autorised data: ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError(
      'You are not authorized to access this route 😠',
      401
    );
  }

  const luckyNumber = Math.floor(Math.random() * 101);
  res.status(200).json({
    msg: `Hello Adiros`,
    secret: `Here is your autorised data: ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
