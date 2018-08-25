import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/db';

dotenv.config();

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

  /**
    * @param {obj} req
    * @param {obj} res
    * @memberof UsersController
    *  @returns {obj} insertion error messages or success message
    */
  userDetails(req, res) {
    db.query(`SELECT * FROM users WHERE id = '${req.decoded.userid}'`)
      .then(user => res.status(200)
        .json({
          status: 'Success',
          message: 'successfull retrived user details',
          data: {
            id: user.rows[0].id,
            fullname: user.rows[0].fullname,
            username: user.rows[0].username,
            email: user.rows[0].email,
            image: user.rows[0].image,
            reminder: user.rows[0].reminder,
          }
        }))
      .catch((err) => { console.log(err); });
  }

  /**
    * @param {obj} req
    * @param {obj} res
    * @memberof UsersController
    *  @returns {obj} insertion error messages or success message
    */
  updateimage(req, res) {
    cloudinary.uploader.upload(req.files.image.path, (result) => {
      const { userid } = req.decoded;
      db.query(`UPDATE users SET image ='${result.url}' WHERE id='${userid}' RETURNING image`).then((user) => {
        res.status(200).json({
          status: 'success',
          imageUrl: user.rows[0].image
        });
      }).catch(err => console.log(err));
    });
  }

  /**
    * @param {obj} req
    * @param {obj} res
    * @memberof UsersController
    *  @returns {obj} insertion error messages or success message
    */
  updateUserProfile(req, res) {
    const { userid } = req.decoded;
    const {
      fullname, username, reminder, email
    } = req.body,
      hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const params = [fullname, username, hashedPassword, reminder, email, userid];
    const sql = 'UPDATE users SET fullname= $1, username= $2, password= $3, reminder= $4, email= $5 WHERE id=$6  RETURNING *';
    db.query(sql, params).then((user) => {
      res.status(200).json({
        status: 'Success',
        message: 'successfully modified your profile',
        userDetails: user.rows[0]
      });
      // create mail transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hnobi.mydiary@gmail.com',
          pass: 'hnobi.mydiary2018'
        }
      });
      // sending emails at periodic intervals for the days of the month
      cron.schedule(`* * * */${reminder} * *`, () => {
        console.log('---------------------');
        console.log('Running Cron Job');
        const mailOptions = {
          from: 'hnobi.mydiary@gmail.com',
          to: `${email}`,
          subject: 'Reminder from your diary',
          text: `Hi  ${username},  why don't you take a minute to write in your diary`,
          html: `<p> Hi<b> ${username},</b> why don't you take a minute to write in your diary, This is an automatimatic reminder from 
          <a href="https://hnobi.github.io/myDiary/client/">MyDiary<a/>.</p> <br>
          <p>You will receive reminder mail every ${reminder} days based on your reminder setting.</p>
          <p> You can go to  <a href="https://hnobi.github.io/myDiary/client/"> https://hnobi.github.io/myDiary/client/<a/> to Add an entry  or set your reminder.</p> 
          `
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            throw error;
          } else {
            console.log('Email successfully sent!');
          }
        });
      });
    }).catch(err => console.log(err));
  }
}
export default new UsersController();
