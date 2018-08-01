import entryData from '../models/entries';
import db from '../models/db';

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
    const { title, entry } = req.body;
    const date = req.body.date || new Date();
    const { userid } = req.decoded;
    db.query(`SELECT * FROM entries where title = '${title}' `)
      .then((entryFound) => {
        if (entryFound.rows.length > 0) {
          return res.status(409)
            .json({
              message: 'title of entry already exist '
            });
        }
        const sql = 'INSERT INTO entries(title, date, entry,userid) VALUES ($1, $2, $3, $4)';
        const params = [title, date, entry, userid];
        db.query(sql, params)
          .then(() => {
            return res.status(201)
              .json({
                status: 'Success',
                message: 'Successfully added new entry',
                data: {
                  userid,
                  title,
                  date,
                  entry
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
      * Modify a particular entry from the entry model
      * @param {obj} req
      * @param {obj} res
      * @returns {obj} insertion error messages or success messages
      *  @memberof EntryController
      */
  static modifyEntry(req, res) {
    const {
      title, entry
    } = req.body,
      date = req.body.date || new Date,
      { entryId } = req.params;
    const sql = 'UPDATE entries SET title= $1,date= $2, entry =$3 WHERE id = $4';
    const params = [title, date, entry, entryId];
    db.query(sql, params).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404)
          .json({
            status: 'Failed',
            message: 'entry id does not exist',
          });
      }
      return res.status(200)
        .json({
          status: 'Success',
          message: 'Successfully updated  your entry',
          data: {
            id: result.rows[0],
            title: result.rows,
            // date: result.rows[0].date,
            entry: result
          }
        });
    }).catch((err) => res.status(500).json({
      status: 'Failed',
      message: err.message
    }));
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
