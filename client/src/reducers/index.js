import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import assignment from './assignment';
import submission from './submission';

export default combineReducers({
  auth,
  user,
  assignment,
  submission
});
