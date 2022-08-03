import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ (event) => handleChange(event) }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ (event) => handleChange(event) }
          />
        </label>

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => handleChange(event) }
        >
          {currencies.map((item, i) => <option key={ i }>{item}</option>)}
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => handleChange(event) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => handleChange(event) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        {
          editor
            ? (
              <button
                type="button"
                onClick={ () => onClickEdit() }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ () => onClickSave() }
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
