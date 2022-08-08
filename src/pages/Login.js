import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  verifyUserLogin as verifyUserLoginAction,
  saveUserData as saveUserDataAction,
  clickStayLoged as clickStayLogedAction } from '../redux/actions/index';
import './Login.css'
import logo from '../assets/logo.jpg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
      registration: false,
    };
  }

  componentDidMount() {
    const { saveUserData } = this.props;
    const data = JSON.parse(localStorage.getItem('userData'));
    saveUserData(data);
  }

  handleEmailChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  login = () => {
    const { verifyUserLogin, emailData, passwordData } = this.props;
    const { email, password } = this.state;
    if (passwordData !== password) {
      return alert('Senha incorreta!');
    } else if (emailData !== email) {
      return alert('Usuário não encontrado, clique em Cadastrar!');
    } else {
      verifyUserLogin();
    }
  }

  registration = () => {
    this.setState({ registration: true });
  }

  handleClickStayLoged = () => {
    const { clickStayLoged } = this.props;
    const { emailData, passwordData } = this.props;
    clickStayLoged();
    this.setState({ email: emailData, password: passwordData }, () => this.enableButton());
  }

  render() {
    const { isDisabled, registration, email, password } = this.state;
    const { isLoged, stayLoged } = this.props;
    return (
      <div className="login_container">
        <div className="user_form_container">
          <h2 className="title">Trybe<span>Wallet</span></h2>
          <form className="user_form">
            <label htmlFor="email-input">
              <input
                data-testid="email-input"
                type="email"
                id="email-input"
                name="email"
                placeholder="Email"
                onChange={ (event) => this.handleEmailChange(event) }
                value={ email }
                className="email_input"
              />
            </label>
            <label htmlFor="password-input">
              <input
                data-testid="password-input"
                type="password"
                id="password-input"
                name="password"
                placeholder="Senha"
                onChange={ (event) => this.handleEmailChange(event) }
                value={ password }
                className="password_input"
              />
            </label>
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ () => this.login() }
              className="button_user_form"
            >
              Entrar
            </button>
            <label htmlFor='stayLoged-input'>
              Permanecer logado
              <input
                type="checkbox"
                id="stayLoged-input"
                name="stayLoged"
                checked={ stayLoged }
                onChange={ () => this.handleClickStayLoged() }
              />
            </label>
            <p className="registration_text">Não possui conta?
              <span onClick={ () => this.registration() }>Cadastrar</span>.</p>
          </form>
          {isLoged && <Redirect to="/carteira" />}
          {registration && <Redirect to="/cadastrar" />}
        </div>

        <div className="image_container">
          <img src={ logo } alt='' className="logo_image" />
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  verifyUserLogin: () => dispatch(verifyUserLoginAction()),
  saveUserData: (data) => dispatch(saveUserDataAction(data)),
  clickStayLoged: () => dispatch(clickStayLogedAction()),
});

const mapStateToProps = (state) => ({
  isLoged: state.userLogin.isLoged,
  emailData: state.userData.email,
  passwordData: state.userData.password,
  stayLoged: state.userLogin.stayLoged,
});

Login.propTypes = {
  verifyUserLogin: PropTypes.func,
  isLoged: PropTypes.bool,
  stayLoged: PropTypes.bool,
  clickStayLoged: PropTypes.func,
  emailData: PropTypes.string,
  passwordData: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
