import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  saveUserData as saveUserDataAction,
  clickStayLoged as clickStayLogedAction
} from '../redux/actions/index';
import './Login.css'
import logo from '../assets/logo.jpg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const { saveUserData } = this.props;
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) saveUserData(data);
  }

  handleChange = ({ target: { value, name } }) => {
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
    const { emailData, passwordData, history } = this.props;
    const { email, password } = this.state;
    if (passwordData !== password) {
      return alert('Senha incorreta!');
    } else if (emailData !== email) {
      return alert('Usuário não encontrado, clique em Cadastrar!');
    } else {
      history.push('/carteira');
    }
  }

  registration = () => {
    const { history } = this.props;
    history.push('/cadastrar');
  }

  handleClickStayLoged = () => {
    const { clickStayLoged } = this.props;
    const { emailData, passwordData } = this.props;
    clickStayLoged();
    this.setState({ email: emailData, password: passwordData }, () => this.enableButton());
  }

  render() {
    const { isDisabled, email, password } = this.state;
    const { stayLoged } = this.props;
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
                onChange={(event) => this.handleChange(event)}
                value={email}
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
                onChange={ (event) => this.handleChange(event) }
                value={password}
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
              {' '}
              <span onClick={ () => this.registration() }>Cadastrar</span>.</p>
          </form>
        </div>

        <div className="image_container">
          <img src={ logo } alt='Woman typing on notebook' className="logo_image" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (data) => dispatch(saveUserDataAction(data)),
  clickStayLoged: () => dispatch(clickStayLogedAction()),
});

const mapStateToProps = (state) => ({
  ...state.userLogin,
  ...state.userData,
});

Login.propTypes = {
  stayLoged: PropTypes.bool,
  clickStayLoged: PropTypes.func,
  emailData: PropTypes.string,
  passwordData: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
