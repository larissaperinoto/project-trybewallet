import React, { Component } from 'react'

class RegistrationForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name-input">
          <input
            type="text"
            id="name-input"
            name="name"
            placeholder="Nome"
            /* onChange={}
            value={} */
          />
        </label>
        <label htmlFor="nickname-input">
          <input
            type="text"
            id="nickname-input"
            name="nickname"
            placeholder="Sobrenome"
            /* onChange={}
            value={} */
          />
        </label>
        <label htmlFor="email-input">
          <input
            type="text"
            id="email-input"
            name="email"
            placeholder="Email"
            /* onChange={}
            value={} */
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="text"
            id="password-input"
            name="password"
            placeholder="Senha"
            /* onChange={}
            value={} */
          />
        </label>
        <button
          type="button"
          // onClick={}
        >
          Cadastrar
        </button>
      </form>
    );
  }
}

export default RegistrationForm;
