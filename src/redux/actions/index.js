export const SAVE_USER_LOGIN = 'SAVE_USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SUM_TOTAL_EXCHANGE = 'SUM_TOTAL_EXCHANGE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const TO_EDIT = 'TO_EDIT';
export const EXIT_WALLET = 'EXIT_WALLET';

export const saveLoginEmail = (email) => ({
  type: SAVE_USER_LOGIN,
  email,
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
  type: 'TO_EDIT',
});

export const exitWalletPage = () => ({
  type: 'EXIT_WALLET'
});
