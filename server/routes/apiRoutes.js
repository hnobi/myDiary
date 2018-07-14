import express from 'express';
import EntryControllers from './../controllers/entry';
import EntryValidations from './../middlewares/entry';


const router = express.Router();


// entry
router.route('/entries')
  .post(EntryValidations.addEntryVaLidation, EntryControllers.addEntry);
router.route('/entries/:entryId')
  .put(EntryValidations.modifyEntryVaLidation, EntryControllers.modifyEntry)





export default router