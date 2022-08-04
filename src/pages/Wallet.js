import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import getCurrencies from '../services/getCurrencies';
import {
  getCurrencies as getCurrenciesAction,
  saveExpense as saveExpenseAction,
  sumTotal as sumTotalAction,
  toEdit as toEditAction,
  deleteExpense as deleteExpenseAction,
} from '../redux/actions';

import './Wallet.css';

const INITIAL_STATE = {
  id: '',
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
  exchangeRates: '',
};

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    const { getCurrenciesAct } = this.props;
    getCurrencies().then((response) => {
      getCurrenciesAct(Object.keys(response).filter((key) => key !== 'USDT'));
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  onClickSave = () => {
    const { expenses, saveExpense } = this.props;
    const id = expenses.length;
    getCurrencies().then((response) => {
      this.setState({ exchangeRates: response, id }, () => {
        saveExpense(this.state);
        this.setState({ ...INITIAL_STATE }, () => this.calculateTotal());
      });
    });
  }

  onClickEdit = () => {
    const { expenses, toEdit, idToEdit, saveExpense } = this.props;
    const newExpenses = expenses.map((obj) => {
      if (obj.id === idToEdit) {
        return this.state;
      }
      return obj;
    });
    saveExpense(newExpenses);
    toEdit();
    this.setState({ ...INITIAL_STATE }, () => this.calculateTotal());
  }

  handleEditExpense = (id) => {
    const { expenses, toEdit } = this.props;
    const objToEdit = expenses.filter((obj) => obj.id === id)[0];
    toEdit();
    this.setState({ ...objToEdit });
  }

  handleDeleteExpense = (obj) => {
    const { deleteExpense } = this.props;
    deleteExpense(obj);
    this.calculateTotal();
    this.setState({}, () => this.calculateTotal());
  }

  calculateTotal = () => {
    const { sumTotal, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => (
      acc + (curr.exchangeRates[curr.currency].ask) * curr.value), 0).toFixed(2);
    sumTotal(total);
  }

  render() {
    return (
      <div className="wallet_container">
        <Header />
        <div className="body_wallet_container">
          <WalletForm
            { ...this.state }
            handleChange={ this.handleChange }
            onClickSave={ this.onClickSave }
            onClickEdit={ this.onClickEdit }
          />
          <Table
            handleDeleteExpense={ this.handleDeleteExpense }
            handleEditExpense={ this.handleEditExpense }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesAct: (currencies) => dispatch(getCurrenciesAction(currencies)),
  saveExpense: (expense) => dispatch(saveExpenseAction(expense)),
  sumTotal: (total) => dispatch(sumTotalAction(total)),
  deleteExpense: (obj) => dispatch(deleteExpenseAction(obj)),
  toEdit: () => dispatch(toEditAction()),
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  idToEdit: PropTypes.string,
  getCurrencies: PropTypes.func,
  saveExpense: PropTypes.func,
  sumTotal: PropTypes.func,
  toEdit: PropTypes.func,
  deleteExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
