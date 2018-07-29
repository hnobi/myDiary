import express from 'express';
import EntryControllers from '../controllers/entryController';
import EntryValidations from '../middlewares/entryValidation';
import UsersControllers from '../controllers/usersController';
import UserValidation from '../middlewares/userValidation';

const router = express.Router();
// User signup and signin
router.route('/auth/signup')
  .post(UserValidation.signUp, UsersControllers.signUp);

// entry
router.route('/entries')
  .post(EntryValidations.addEntryVaLidation, EntryControllers.addEntry)
  .get(EntryControllers.getAllEntry);

router.route('/entries/:entryId')
  .put(EntryValidations.modifyEntryVaLidation, EntryControllers.modifyEntry)
  .get(EntryControllers.getEntry)
  .delete(EntryControllers.deleteEntry);
export default router;
