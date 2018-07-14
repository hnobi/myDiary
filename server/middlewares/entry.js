import validator from 'validator';

/**
 *Validates POST and GET requests for recipes route
 * @class EntryValidation
 */
export default class EntryValidation {
  /**
  * Validates addEntry before allowing access to controller class
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns validation error messages object or contents of request.body object
   * @param {*} next
   * @memberof EntryValidation
   */
  static addEntryVaLidation(req, res, next) {
    const { title, date, entry } = req.body,
      errors = {};

    if (title === undefined || date === undefined || entry === undefined) {
      return res.status(400)
        .json({
          message: 'All or some of the field is/are undefined'
        });
    } else {
      if (!validator.isEmpty(title)) {
        for (let character = 0; character < title.length; character += 1) {
          if (validator.toInt(title[character])) {
            errors.title = 'Entry title must not contain numbers';
            break;
          }
        }
      } else { errors.title = 'Title of entry is required'; }
      if (!validator.isEmpty(entry)) {
        if (!validator.isLength(entry, { min: 10, max: 2000 })) {
          errors.entry = 'Diary entry provided must be between 10 to 2000 characters';
        }
      } else { errors.entry = 'Diary entry is required'; }

      if (validator.isEmpty(date)) {
        messages.push('date is required');
      }
    }
    // checks if the errors object is empty
    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({ errors });
    }
    next();
  }






}
