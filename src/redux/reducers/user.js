import { SAVE_USER_LOGIN, EXIT_WALLET } from '../actions/index';

const INITIAL_USER_STATE = {
  email: '',
  exit: false,
};

const verifyUserLogin = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_LOGIN:
    return {
      ...state,
      email: action.email,
      exit: false,
    };
    case EXIT_WALLET:
      return {
        ...state,
        exit: true,
      }
  default:
    return state;
  }
};

export default verifyUserLogin;
