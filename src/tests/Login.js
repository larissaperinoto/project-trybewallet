import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página de Login', () => {
  test('Verifica se o titulo TrybeWallet é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', {
      name: /TrybeWallet/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se os inputs estão aparecendo na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o botão está aparecendo na tela', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /Entrar/i });

    expect(button).toBeInTheDocument();;
  });

  test('Veriifca se o botão está validado', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'teste');
    expect(button.disabled).toBeTruthy();

    userEvent.type(inputPassword, '1234');
    expect(button.disabled).toBeTruthy();

  });

  test('Verifica se o botão é ativado ao inserir email e ao clicar direciona para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');
    expect(button.disabled).not.toBeTruthy();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
