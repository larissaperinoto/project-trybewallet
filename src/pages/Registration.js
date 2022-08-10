import React, { Component } from 'react'
import { connect } from 'react-redux';

import RegistrationForm from '../components/RegistrationForm';
import { saveUserData as saveUserDataAction } from '../redux/actions';

class Registration extends Component {
  constructor() {
    super();

    this.state ={
      name: '',
      nickname:'',
      email: '',
      password:'',
      isDisabled: true,
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton = () => {
    const { name, nickname, email, password } = this.state;
    const verifyPassword = password.length > 6;
    const verifyEmail = (/\S+@\S+\.\S+/).test(email);
    if (name && nickname && verifyPassword && verifyEmail) {
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
  }

  render() {
    return (
      <>
        <RegistrationForm
          handleChange={ this.handleChange }
          handleClickSave={ this.handleClickSave }
          {... this.state }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (user) => dispatch(saveUserDataAction(user)),
});

export default connect(null, mapDispatchToProps)(Registration);
