import React, { Component } from 'react'
import { connect } from 'react-redux';

import RegistrationForm from '../components/RegistrationForm';
import { saveUserData as saveUserDataAction } from '../redux/actions';

const INITIAL_STATE = {
  name: '',
  nickname:'',
  email: '',
  password:'',
}

class Registration extends Component {
  constructor() {
    super();

    this.state ={
      ...INITIAL_STATE,
      isDisabled: true,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton = () => {
    const { name, nickname, email, password } = this.state;
    const verifyPassword = password.length >= 6;
    const verifyEmail = (/\S+@\S+\.\S+/).test(email);
    if (name && nickname && verifyPassword && verifyEmail) {
      console.log('varifica email e senha')
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClickSave = () => {
    const { saveUserData } = this.props;
    const { name, nickname, email, password } = this.state;
    saveUserData({ name, nickname, email, password });
    localStorage.setItem('userData', JSON.stringify({ name, nickname, email, password }));
    this.setState({ ...INITIAL_STATE });
  }

  returnToLogin = () => {
    const { history } = this.props;
    history.push('/project-trybewallet');
  }

  render() {
    return (
      <>
        <RegistrationForm
          handleChange={ this.handleChange }
          handleClickSave={ this.handleClickSave }
          {... this.state }
        />
         <span onClick={ () => this.returnToLogin() }>Fazer login</span>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (user) => dispatch(saveUserDataAction(user)),
});

export default connect(null, mapDispatchToProps)(Registration);
