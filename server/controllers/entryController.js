import db from '../models/db';
/**
* @export
*  @class EntryController
*/
class EntryController {
  /**
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} insertion error messages or success messages
   * @memberof EntryController
   */
  addEntry(req, res) {
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
          .then(() => res.status(201)
            .json({
              status: 'Success',
              message: 'Successfully added new entry',
              data: {
                userid,
                title,
                date,
                entry
              }
            })).catch(err => res.status(500).json({
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
  modifyEntry(req, res) {
    const {
      title, entry
    } = req.body,
      date = req.body.date || new Date(),
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
            id: entryId,
            title,
            entry
          }
        });
    }).catch(err => res.status(500).json({
      status: 'Failed2',
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
  getAllEntry(req, res) {
    const sql = 'SELECT * FROM entries WHERE userid = $1',
      param = [req.decoded.userid];
    db.query(sql, param).then((entries) => {
      if (entries.rows.length < 1) {
        return res.status(200).json({
          message: 'No entry in your diary'
        });
      }
      return res.status(200)
        .json({
          status: 'Success',
          message: `Successsfully retrieved all diary entries with total of ${entries.rows.length} entries`,
          entries: entries.rows
        });
    }).catch((err) => {
      res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    });
  }

  /**
      * Get a particular entry from the entry model
      * @param {obj} req
      * @param {obj} res
      * @returns {obj} insertion error messages or success messages
      */
  getEntry(req, res) {
    const { entryId } = req.params;

    const sql = 'SELECT * FROM entries WHERE userid = $1 AND id = $2',
      param = [req.decoded.userid, entryId];
    db.query(sql, param).then((result) => {
      if (result.rowCount === 0) {
        return res.status(404)
          .json({
            status: 'Failed',
            message: 'Entry not found'
          });
      }
      return res.status(200)
        .json({
          status: 'Success',
          message: 'Successfully retrieve an entry',
          data: result.rows[0]
        });


      //
    }).catch((err) => {
      res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    });
  }

  /**
     * Deletes a particular entry from the entry model
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} insertion error messages or success messages
     * @memberof EntryController
     */
  deleteEntry(req, res) {
    const { entryId } = req.params;
    const sql = 'DELETE FROM entries WHERE userid = $1 AND id = $2',
      param = [req.decoded.userid, entryId];
    db.query(sql, param).then((results) => {
      if (results.rowCount === 0) {
        return res.status(404)
          .json({
            status: 'Failed',
            message: 'entry id does not exist',
          });
      }
      return res.status(200)
        .json({
          status: 'Success',
          message: 'Successfully deleted entry',
        });
    }).catch((err) => {
      return res.status(500).json({
        status: 'Failed',
        message: err.message
      });
    });
  }
}
export default new EntryController();
