import {
  GET_CURRENCIES,
  SAVE_EXPENSE,
  SUM_TOTAL_EXCHANGE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  TO_EDIT,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const waletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: state.editor
        ? [...action.expenses] : [...state.expenses, action.expenses],
    };
  case SUM_TOTAL_EXCHANGE:
    return {
      ...state,
      total: action.total,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((item) => item.id !== action.expenseToDelete.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.idToEdit,
    };
  case TO_EDIT:
    return {
      ...state,
      editor: !state.editor,
    };
  default:
    return state;
  }
};

export default waletReducer;
