import express from 'express';
import EntryController from './../controllers/entry';


const router = express.Router();


// entry
router.route('/entry')
  .post(EntryController.addEntry);





export default router