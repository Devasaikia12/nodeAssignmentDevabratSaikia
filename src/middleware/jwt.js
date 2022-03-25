import JWT from 'jsonwebtoken';
const TOKEN_KEY = process.env.TOKEN_KEY;
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token not found');
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export default verifyToken;
