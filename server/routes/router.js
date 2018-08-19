import express from 'express';
import EntryControllers from '../controllers/entryController';
import EntryValidations from '../middlewares/entryValidation';
import UsersControllers from '../controllers/usersController';
import UserValidation from '../middlewares/userValidation';
import authToken from '../middlewares/authToken';
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const router = express.Router()
// User signup and signin
router.route('/auth/signup')
  .post(UserValidation.signUp, UsersControllers.signUp);
router.route('/auth/signin')
  .post(UserValidation.signIn, UsersControllers.signIn);
// User details
router.route('/user/details')
  .put(authToken, multipartMiddleware, UsersControllers.updateUserProfile)
  .get(authToken, UsersControllers.userDetails);

// entry
router.route('/entries')
  .post(authToken, EntryValidations.addEntryVaLidation, EntryControllers.addEntry)
  .get(authToken, EntryControllers.getAllEntry);

router.route('/entries/:entryId')
  .put(authToken, EntryValidations.modifyEntryVaLidation, EntryControllers.modifyEntry)
  .get(authToken, EntryControllers.getEntry)
  .delete(authToken, EntryControllers.deleteEntry);
export default router;
