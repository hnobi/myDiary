import express from 'express';
import EntryControllers from './../controllers/entry';
import EntryValidations from './../middlewares/entry';


const router = express.Router();


// entry
router.route('/entries')
  .post(EntryValidations.addEntryVaLidation, EntryControllers.addEntry);





export default router