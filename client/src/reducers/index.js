import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import assignment from './assignment';

export default combineReducers({
  auth,
  user,
  assignment
});
