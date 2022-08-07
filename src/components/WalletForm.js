import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WalletForm.css';

class WalletForm extends Component {
  render() {
    const { value,
      tag,
      description,
      currency,
      method,
      onClickSave,
      onClickEdit,
      handleChange,
      editor,
      currencies } = this.props;
    return (
      <form className="form_expense_container">
        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
            name="value"
            value={ value }
            placeholder="Digite um valor"
            onChange={ (event) => handleChange(event) }
            className="value_input"
          />
        </label>

        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            name="description"
            placeholder="Descreva a despesa"
            value={ description }
            onChange={ (event) => handleChange(event) }
            className="description_input"
          />
        </label>

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => handleChange(event) }
          className="currency_select"
        >
          <optgroup>
            {currencies.map((item, i) => (
              <>

              <option key={ i }>{item}</option>

              </>
              ))}
          </optgroup>
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => handleChange(event) }
          className="method_select"
        >
          <optgroup>
            <option>Método de pagamento</option>
            <option selected>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </optgroup>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => handleChange(event) }
          className="tag_select"
        >
          <optgroup>
            <option>Categoria</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </optgroup>
        </select>
        {
          editor
            ? (
              <button
                type="button"
                onClick={ () => onClickEdit() }
                className="button_expense_form"
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ () => onClickSave() }
                className="button_expense_form"
              >
                Adicionar despesa
              </button>)
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickSave: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
