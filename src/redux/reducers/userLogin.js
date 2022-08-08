import {
  VERIFY_USER_LOGIN,
  EXIT_WALLET,
  CLICK_STAY_LOGED } from '../actions/index';

const INITIAL_USER_STATE = {
  exit: false,
  isLoged: false,
  stayLoged: false,
};

const verifyUserLogin = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case VERIFY_USER_LOGIN:
    return {
      ...state,
      isLoged: true,
      exit: false,
    };
    case EXIT_WALLET:
      return {
        ...state,
        isLoged: false,
        exit: true,
      }
    case CLICK_STAY_LOGED:
      return {
        ...state,
        stayLoged: !state.stayLoged,
      }
  default:
    return state;
  }
};

export default verifyUserLogin;
