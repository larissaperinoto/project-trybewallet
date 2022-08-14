import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './RegistrationForm.css';

class RegistrationForm extends Component {
  render() {
    const { name,
      nickname,
      email,
      password,
      isDisabled,
      handleChange,
      handleClickSave,
      returnToLogin } = this.props;
    return (
          <form className="registration-form">
            <label htmlFor="name-input">
              <input
                type="text"
                id="name-input"
                name="name"
                placeholder="Nome"
                onChange={ (event) => handleChange(event) }
                value={ name }
              />
            </label>
            <label htmlFor="nickname-input">
              <input
                type="text"
                id="nickname-input"
                name="nickname"
                placeholder="Sobrenome"
                onChange={ (event) => handleChange(event)  }
                value={ nickname }
              />
            </label>
            <label htmlFor="email-input">
              <input
                type="text"
                id="email-input"
                name="email"
                placeholder="Email"
                onChange={ (event) => handleChange(event)  }
                value={ email }
              />
            </label>
            <label htmlFor="password-input">
              <input
                type="text"
                id="password-input"
                name="password"
                placeholder="Senha"
                onChange={ (event) => handleChange(event)  }
                value={ password }
              />
            </label>
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ handleClickSave }
            >
              Enviar
            </button>
              <span
                onClick={ returnToLogin }
                className="registration-return"
              >
                Fazer login.
              </span>
          </form>
    );
  }
}

RegistrationForm.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  handleChange: PropTypes.func,
  returnToLogin: PropTypes.func,
}.isRequired;

export default RegistrationForm;
