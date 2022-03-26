import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME;
const secret = process.env.JWT_SECRET;

const issueToken = async (user) => {
  const payload = {
    email: user.email,
    sub: user.id,
    expiration: Date.now() + parseInt(expirationtimeInMs),
  };

  const option = {
    expiresIn: expirationtimeInMs,
    //algorithm: HS256,
  };

  const token = jwt.sign(payload, secret, option);

  return {
    token: token,
    expires: expirationtimeInMs,
  };
};

export default issueToken;
