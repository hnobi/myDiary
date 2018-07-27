import bcrypt from 'bcryptjs';
import db from '../models/db';

/**
 * @export
 * @class UsersController
 */
export default class UsersController {
  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   *  @returns {obj} insertion error messages or success message
   */
  static signUp(req, res) {
    const { fullname, username, email } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 10);
    db.connect();
    db.query(`SELECT id FROM users WHERE email = '${email}' OR username = '${username}'`).then((userfound) => {
      if (userfound.rows.length > 0) {
        return res.status(400)
          .json({
            status: 'Failed',
            message: `User ${username} already exist`
          });
      }
      const sql = 'INSERT INTO users(fullname , username, email, password) VALUES ($1, $2,$3,$4)';
      const params = [fullname, username, email, hashedPassword];
      db.query(sql, params).then(user => {
        return res.status(201)
          .json({
            status: 'Success',
            message: 'Successfully created myDiary account',
            data: {
              id: user[0].id,
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword
            }
          })
      });
    }).catch(error => res.status(500).json({
      status: 'Failed',
      message: error.message
    }));
  }
}
