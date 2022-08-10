import { CLICK_STAY_LOGED } from '../actions/index';

const INITIAL_USER_STATE = {
  isLoged: false,
  stayLoged: false,
};

const verifyUserLogin = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
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
