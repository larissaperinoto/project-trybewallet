import { combineReducers } from 'redux';

import userLogin from './userLogin';
import wallet from './wallet';
import userData from './userData';

const rootReducer = combineReducers({
  userLogin,
  wallet,
  userData,
});

export default rootReducer;
