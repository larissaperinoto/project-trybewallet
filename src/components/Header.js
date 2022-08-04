import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css'

import { exitWalletPage as exitWalletPageAction } from '../redux/actions';

class Header extends Component {
  render() {
    const { email, total, exitWalletPage } = this.props;
    return (
      <div className="header_container">
        <div className="logo_email_container">
          <h2 className="title_header">Trybe<span>Wallet</span></h2>
          <span data-testid="email-field" className="user_email">{ `Olá, ${email}` }</span>
        </div>
        <div className="total_container">
          <span
            className="exit"
            onClick={ () => exitWalletPage() }
          >
            Sair
          </span>
          <span
            data-testid="total-field"
            className="total"
          >
            { `R$ ${total} BRL` }
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  exitWalletPage: () => dispatch(exitWalletPageAction()),
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.string,
  exitWalletPage: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
