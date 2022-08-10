import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css'

class Header extends Component {
  exitWalletPage = () => {
    const { history: { location } } = this.props;
    location.pathname.push('/project-trybewallet');
  }

  render() {
    const { name, total, exitWalletPage } = this.props;
    return (
      <div className="header_container">
        <div className="logo_email_container">
          <h2 className="title_header">Trybe<span>Wallet</span></h2>
          <span data-testid="email-field" className="user_email">{ `Olá, ${name}` }</span>
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
  ...state.userData,
  ...state.wallet,
});


Header.propTypes = {
  name: PropTypes.string,
  total: PropTypes.string,
  exitWalletPage: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
