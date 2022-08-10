import { SAVE_USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  nickname: '',
  email: '',
  password: '',
};

const registrationData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        name: action.user.name,
        nickname: action.user.nickname,
        email: action.user.email,
        password: action.user.password,
      };
    default:
      return state;
  }
};

export default registrationData;
