import entryData from './../models/entries';


/**
 * @export
 * @class EntryController
 */
export default class EntryController {

  /**
   * @param {obj} req
   * @param {obj} res
   * @returns insertion error messages or success messages 
   * @memberof EntryController
   */
  static addEntry(req, res) {
    entryData.forEach((element) => {
      if (element.title === req.body.title) {
        return res.json({ message: 'title already exist' });
      }
    });
    const NewId = entryData[entryData.length - 1].id + 1
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
    return res.status(200)
      .json({
        status: 'Success',
        message: 'Successfully added new entry',
        entryData
      });


  }





}
