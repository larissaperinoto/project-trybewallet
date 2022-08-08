import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';
import userData from './userData';

const rootReducer = combineReducers({
  user,
  wallet,
  userData,
});

export default rootReducer;
