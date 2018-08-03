import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/db';


/**
 * @export
 * @class UsersController
 */
class UsersController {
  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   *  @returns {obj} insertion error messages or success message
   */
  signUp(req, res) {
    const { fullname, username, email } = req.body;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const sql = 'INSERT INTO users(fullname , username, email, password) VALUES ($1, $2,$3,$4)';
    const params = [fullname, username, email, hashedPassword];
    db.query(`SELECT id FROM users WHERE email = '${email}' OR username = '${username}'`)
      .then((userfound) => {
        if (userfound.rows.length > 0) {
          return res.status(409)
            .json({
              status: 'Failed',
              message: 'User already exist'
            });
        }
        db.query(sql, params)
          .then(result => {
            const payload = {
              fullname: user.rows[0].fullname,
              username: user.rows[0].username,
              userid: user.rows[0].id
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 10 // 10 hours
            });
            req.token = token;
            return res.status(201)
              .json({
                result,
                status: 'Success',
                message: 'Successfully created myDiary account',
                data: {
                  username: req.body.username,
                  email: req.body.email,
                  token: token
                }
              })
          }).catch(err => res.status(500).json({
            status: 'Failed',
            message: err.message
          }));
      }).catch(err => res.status(500).json({
        status: 'Failed',
        message: err.message
      }));
  }

  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof UsersController
   *  @returns {obj} insertion error messages or success message
   */
  signIn(req, res) {
    const { username, password } = req.body;
    db.query(`SELECT * FROM users WHERE username = '${username}'`).then((user) => {
      if (user.rows.length > 0) {
        const checkedPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (checkedPassword) {
          const payload = {
            fullname: user.rows[0].fullname,
            username: user.rows[0].username,
            userid: user.rows[0].id
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 10 // 10 hours
          });
          req.token = token;
          return res.status(200)
            .json({
              status: 'Success',
              message: 'successfull login',
              data: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email
              },
              token
            });
        }
      }
      return res.status(500)
        .json({
          status: 'Failed',
          message: 'invalid username or password'
        });
    }).catch((err) => {
      res.status(500)
        .json({
          status: 'Failed',
          message: err.message
        });
    });
  }
}
export default new UsersController();
