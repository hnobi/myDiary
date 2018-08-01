import express from 'express';
import EntryControllers from '../controllers/entryController';
import EntryValidations from '../middlewares/entryValidation';
import UsersControllers from '../controllers/usersController';
import UserValidation from '../middlewares/userValidation';
import authToken from '../middlewares/authToken'

const router = express.Router();

// User signup and signin
router.route('/auth/signup')
  .post(UserValidation.signUp, UsersControllers.signUp);
router.route('/auth/signin')
  .post(UsersControllers.signIn);

// entry
router.route('/entries')
  .post(authToken, EntryValidations.addEntryVaLidation, EntryControllers.addEntry)
  .get(authToken, EntryControllers.getAllEntry);

router.route('/entries/:entryId')
  .put(authToken, EntryValidations.modifyEntryVaLidation, EntryControllers.modifyEntry)
  .get(EntryControllers.getEntry)
  .delete(EntryControllers.deleteEntry);
export default router;
