import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


/**
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @returns {obj} Failure error message on bad request or User decoded data on granted request
 */
const authethicateToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token generated by user payload during signin or signup
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          status: 'Failed',
          message: 'Authentication failed. Token is either invalid or expired'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403);
    res.json({
      status: 'Failed',
      message: 'wrong token. provide  a valid token'
    });
  }
};
export default authethicateToken;
