export const VERIFY_USER_LOGIN = 'VERIFY_USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SUM_TOTAL_EXCHANGE = 'SUM_TOTAL_EXCHANGE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const TO_EDIT_EXPENSE = 'TO_EDIT_EXPENSE';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const CLICK_STAY_LOGED = 'CLICK_STAY_LOGED';

export const verifyUserLogin = () => ({
  type: VERIFY_USER_LOGIN,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export const sumTotal = (total) => ({
  type: SUM_TOTAL_EXCHANGE,
  total,
});

export const deleteExpense = (obj) => ({
  type: DELETE_EXPENSE,
  expenseToDelete: obj,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  idToEdit: id,
});

export const toEdit = () => ({
  type: TO_EDIT_EXPENSE,
});

export const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  user,
});

export const clickStayLoged = () => ({
  type: CLICK_STAY_LOGED,
});
