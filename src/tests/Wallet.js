import React from 'react';
import { screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from './helpers/renderWith';
import Wallet  from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Verifica a renderizaçao da página Wallet', () => {
  test('Verifica se os itens adicionados são renderizados na tela e os botões Excluir/Editar', async () => {
    fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    })

    renderWithRedux(<Wallet />);

    await waitFor(() => expect(fetch).toBeCalledTimes(1));

    const valueInput = screen.getByRole("spinbutton", { name: /valor:/i });
    const description = screen.getByRole("textbox", { name: /descrição:/i });
    const addButton = screen.getByRole("button", { name: /adicionar despesa/i });
    const trBody = screen.getAllByRole("rowgroup")[1];

    userEvent.type(valueInput, '10');
    userEvent.type(description, 'ônibus');
    userEvent.click(addButton);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(valueInput.value).toBe('');
    expect(description.value).toBe('');
    expect(trBody.childNodes.length).toBe(1);

    const deleteButton = screen.getByRole("button", { name: /Excluir/i });
    const editButton = screen.getByRole("button", { name: 'Editar' });

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);
    expect(screen.getAllByRole("button", { name: /editar/i }).length).toBe(2);

    expect(valueInput.value).toBe('10');
    expect(description.value).toBe('ônibus');

    userEvent.type(valueInput, '30');
    userEvent.click(addButton);
    expect(valueInput.value).toBe('');

    expect(trBody.childNodes.length).toBe(1);
  });
});
