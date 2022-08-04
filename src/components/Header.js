import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css'

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div className="header_container">
        <div className="logo_email_container">
          <h2 className="title_header">Trybe<span>Wallet</span></h2>
          <span data-testid="email-field" className="user_email">{ `Olá, ${email}` }</span>
        </div>
        <div className="total_container">
          <span className="exit">Sair</span>
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

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
