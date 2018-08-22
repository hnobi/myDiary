import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import db from '../models/db';

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret
});
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
    db.query(`SELECT id FROM users WHERE email = '${email}' OR username = '${username}'`)
      .then((userfound) => {
        if (userfound.rows.length > 0) {
          return res.status(409)
            .json({
              status: 'Failed',
              message: 'User already exist'
            });
        }
        const sql = 'INSERT INTO users(fullname , username, email, password) VALUES ($1, $2,$3,$4) RETURNING *';
        const params = [fullname, username, email, hashedPassword];
        db.query(sql, params)
          .then((user) => {
            const payload = {
              fullname,
              username,
              userid: user.rows[0].id
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 10 // 10 hours
            });
            req.token = token;
            res.status(201)
              .json({
                status: 'Success',
                message: 'Successfully created myDiary account',
                data: user.rows[0],
                token
              });
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
                email: user.rows[0].email,
                image: user.rows[0].image

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

  userDetails(req, res) {
    db.query(`SELECT * FROM users WHERE id = '${req.decoded.userid}'`)
      .then((user) => res.status(200)
        .json({
          status: 'Success',
          message: 'successfull retrived user details',
          data: {
            id: user.rows[0].id,
            fullname: user.rows[0].fullname,
            username: user.rows[0].username,
            email: user.rows[0].email,
            password: user.rows[0].password,
            image: user.rows[0].image,
            remainder: user.rows[0].remainder,
          }
        }))
      .catch((err) => { console.log(err); });
  }

  updateimage(req, res) {
    cloudinary.uploader.upload(req.files.image.path, (result) => {
      const { userid } = req.decoded;
      db.query(`UPDATE users SET image ='${result.url}' WHERE id='${userid}' RETURNING image`).then((user) => {
        res.status(200).json({
          status: 'success',
          imageUrl: user.rows[0].image
        })
      }).catch(err => console.log(err))
    });
  };
  updateUserProfile(req, res) {
    const { userid } = req.decoded;
    const { fullname, username, remainder } = req.body,
      hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const params = [fullname, username, hashedPassword, remainder, userid];
    const sql = 'UPDATE users SET fullname= $1, username= $2, password= $3, remainder= $4 WHERE id=$5  RETURNING *';
    db.query(sql, params).then((user) => {

      res.status(200).json({
        status: 'Success',
        message: 'successfully modified your profile',
        userDetails: user.rows[0]

      })
    }).catch(err => console.log(err))
  };

}
export default new UsersController();
