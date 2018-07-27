import validator from 'validator';

export default class UserValidation {
  const { fullname, date, entry } = req.body,

  static signup(req, res, next) {
    if (fullname === undefined || username === undefined || email === undefined || password === undefined) {
      return res.status(400)
        .json({
          message: 'All or some of the field is/are undefined'
        });
    }
    if (!validator.isEmpty(fullname)) {
      for (let character = 0; character < fullname.length; character += 1) {
        if (validator.toInt(fullname[character])) {
          errors.fullname = 'fullname  must not contain numbers';
          break;
        }
      }
    } else { errors.fullname = 'fullname  is required'; }


  }

}