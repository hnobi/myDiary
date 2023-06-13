import validator from 'validator';

/**
 * Validates Signup and Signin POST requests
 * @class UserValidation
 */
class UserValidation {
  /**
  * Validates signup
  * @param {obj} req
  * @param {obj} res
  * @param {obj} next
  * @memberof UserValidation
  * @returns {obj} validation error messages object or contents of request.body object
 */
  signUp(req, res, next) {
    const {
      fullname, username, email, password
    } = req.body;
    const errors = {};
    if (fullname === undefined || username === undefined
      || email === undefined || password === undefined) {
      return res.status(400)
        .json({
          message: 'All or some of the field is/are undefined'
        });
    }
    if (!validator.isEmpty(fullname)) {
      for (let i = 0; i < fullname.length; i += 1) {
        if (validator.toInt(fullname[i])) {
          errors.fullname = 'fullname  must not contain numbers';
          break;
        }
      }
    } else { errors.fullname = 'fullname  is required'; }

    if (!validator.isEmpty(username)) {
      if (!validator.isLength(username, { min: 2, max: 15 })) {
        errors.username = 'username must be between 2 to 15 characters';
      }
    } else { errors.username = 'username  is required'; }

    if (!validator.isEmpty(email)) {
      if (!validator.isEmail(email)) {
        errors.email = 'Enter a valid email address';
      }
    } else { errors.email = 'email is required'; }
    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 4 })) {
        errors.password = 'password must be four character or more';
      }
    } else { errors.password = 'password  is required'; }
    
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  }

  /**
  * Validates signup
  * @param {obj} req
  * @param {obj} res
  * @param {obj} next
  * @memberof UserValidation
  * @returns {obj} validation error messages object or contents of request.body object
 */
  signIn(req, res, next) {
    const { username, password } = req.body;
    const errors = {};
    if (username === undefined || password === undefined) {
      return res.status(400)
        .json({
          message: 'All or some of the field is/are undefined'
        });
    }

    if (!validator.isEmpty(username)) {
      if (!validator.isLength(username, { min: 2, max: 100 })) {
        errors.username = 'username must be between 2 to 100 characters';
      }
    } else { errors.username = 'username  is required'; }

    if (validator.isEmpty(password)) { errors.password = 'password  is required' }
    
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  }
}
export default new UserValidation();
