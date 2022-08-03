import { SAVE_USER_LOGIN } from '../actions/index';

const INITIAL_USER_STATE = {
  email: '',
};

const verifyUserLogin = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default verifyUserLogin;
