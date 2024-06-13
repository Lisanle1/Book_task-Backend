const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        statusCode: '401',
        message: 'Unauthorized: Token not found'
      });
    }

    const authToken = token.split(' ')[1];
    const decodeUserData = jwt.verify(authToken, process.env.SECRET_KEY);
    req.user = decodeUserData;
    next();
  } catch (error) {
    console.error('Token error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        statusCode: '401',
        message: 'Unauthorized: Invalid token'
      });
    } else {
      return res.status(500).json({
        statusCode: '500',
        message: 'Internal Server Error'
      });
    }
  }
};
