import entryData from '../models/entries';
/**
* @export
*  @class EntryController
*/
export default class EntryController {
  /**
   * @param {obj} req
   * @param {obj} res
   * @memberof EntryController
  * @returns {obj} insertion error messages or success messages
   */
  static addEntry(req, res) {
    entryData.forEach((element) => {
      if (element.title === req.body.title) {
        return res.json({ message: 'title of entry already exist ' });
      }
    });
    const NewId = entryData[entryData.length - 1].id + 1;
    const {
      title,
      date,
      entry
    } = req.body;
    entryData.push({
      id: NewId,
      title,
      date,
      entry
    });
    return res.status(201)
      .json({
        status: 'Success',
        message: 'Successfully added new entry',
        entryData
      });
  }

  /**
      * Modify a particular entry from the entry model
      * @param {obj} req
      * @param {obj} res
      * @returns {obj} insertion error messages or success messages
      *  @memberof EntryController
      */
  static modifyEntry(req, res) {
    const {
      title, date, entry
    } = req.body;
    for (let i = 0; i < entryData.length; i += 1) {
      if (entryData[i].id === parseInt(req.params.entryId, 10)) {
        entryData[i].title = (title) || entryData[i].title;
        entryData[i].date = (date) || entryData[i].date;
        entryData[i].entry = (entry) || entryData[i].entry;
        return res.status(200)
          .json({
            status: 'Success',
            message: 'Successfully updated  your entry',
            entryData,
          });
      }
    }
    res.status(404);
    res.json({
      status: 'Failed',
      message: 'entry id does not exist',
    });
  }

  /**
      * Get all entries from the entry model
      * @param {obj} req
      * @param {obj} res
      * @returns {obj} insertion error messages or success messages
      * @memberof EntryController
      */
  static getAllEntry(req, res) {
    if (entryData.length !== 0) {
      return res.status(200).json({
        status: 'Success',
        message: `Successsfully retrieved all diary entries with total of ${entryData.length} entries`,
        entryData
      });
    }
    return res.status(200).json({
      message: 'No entry in your diary'
    });
  }

  /**
      * Get a particular entry from the entry model
      * @param {obj} req
      * @param {obj} res
      * @returns {obj} insertion error messages or success messages
      */
  static getEntry(req, res) {
    for (let i = 0; i < entryData.length; i += 1) {
      if (entryData[i].id === parseInt(req.params.entryId, 10)) {
        return res.status(200)
          .json({
            status: 'Success',
            message: 'Successfully retrieve an entry',
            Entry: entryData[i]
          });
      }
    }

    return res.status(404)
      .json({
        status: 'Failed',
        message: 'Page not found'
      });
  }

  /**
     * Deletes a particular entry from the entry model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof EntryController
     */
  static deleteEntry(req, res) {
    for (let i = 0; i < entryData.length; i += 1) {
      if (entryData[i].id === parseInt(req.params.entryId, 10)) {
        entryData.splice(i, 1);
        return res.status(200)
          .json({
            status: 'Success',
            message: 'Successfully deleted entry',
            entryData
          });
      }
    }
    return res.status(400)
      .json({
        status: 'failed',
        message: 'events id does not exist',
      });
  }
}
