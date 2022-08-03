import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Verifica a renderzação do componente WalletForm', () => {
  test('Verifica se os inputs do formulário são renderizado', () => {
    renderWithRedux(<WalletForm />, );

    expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar despesa/i})).toBeInTheDocument();
  });

  test('Verifica se a requisição a API é feita ao renderizar o formulário', () => {
    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    })

    renderWithRedux(<Wallet />);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );
  });

  test('Verifica se ao clicar em Adicionar despesa os campo de input são limpos e a despesa é adicionada na tabela', async () => {
    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    })

    renderWithRedux(<Wallet />);

    await waitFor(() => expect(fetch).toBeCalledTimes(1));

    const valueInput = screen.getByRole("spinbutton", { name: /valor:/i });
    const description = screen.getByRole("textbox", { name: /descrição:/i });
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const addButton = screen.getByRole("button", { name: /adicionar despesa/i });
    const trBody = screen.getAllByRole("rowgroup")[1];

    userEvent.type(valueInput, '20.00');
    userEvent.type(description, 'Lanche');
    userEvent.selectOptions(method, ['Dinheiro']);
    userEvent.selectOptions(tag, ['Alimentação']);
    userEvent.selectOptions(currency, ['EUR']);

    userEvent.click(addButton);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(trBody.childNodes.length).toBe(1);
    expect(valueInput.value).toBe('');
    expect(description.value).toBe('');

    const total = screen.getByTestId('total-field');
    expect(total.innerHTML).not.toBe('0.00');

    expect(screen.getByText('Lanche')).toBeInTheDocument();
    expect(screen.getByText('20.00')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /editar/i });
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /excluir/i });
    userEvent.click(deleteButton);
    expect(trBody.childNodes.length).toBe(0);
  });
});
