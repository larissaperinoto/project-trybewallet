import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveLoginEmail as saveLoginEmailAction } from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      login: false,
    };
  }

  handleEmailChange = ({ target: { value } }) => {
    this.setState({ email: value });
  }

  verifyLogin = ({ target: { value } }) => {
    const passwordRule = 6;
    const emailRule = /\S+@\S+\.\S+/;
    const { email } = this.state;
    const password = value.length >= passwordRule;
    const validation = emailRule.test(email) && password;
    this.setState({ isDisabled: !validation });
  }

  login = () => {
    const { email } = this.state;
    const { saveLoginEmail } = this.props;
    this.setState({ login: true });
    saveLoginEmail(email);
  }

  render() {
    const { isDisabled, login } = this.state;
    return (
      <div>
        <h2>TrybeWallet</h2>
        <form>
          <label htmlFor="email-input">
            <input
              data-testid="email-input"
              type="email"
              id="email-input"
              name="email-input"
              placeholder="Email"
              onChange={ (event) => this.handleEmailChange(event) }
            />
          </label>
          <label htmlFor="password-input">
            <input
              data-testid="password-input"
              type="password"
              id="password-input"
              name="password-input"
              placeholder="Senha"
              onChange={ (event) => this.verifyLogin(event) }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => this.login() }
          >
            Entrar
          </button>
        </form>
        { login && <Redirect to="/carteira" />}
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLoginEmail: (email) => dispatch(saveLoginEmailAction(email)),
});

Login.propTypes = {
  saveLoginEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
