import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
const secret = process.env.JWT_SECRET;
const authToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.params.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    const decode = await jwt.verify(token, secret);
    const user = await User.findOne({ email: decode.email });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default authToken;
