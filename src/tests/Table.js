import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';

import Table from '../components/Table';

describe('Verifica a renderização do componente Table', () => {
  test('Verifica se os títulos da tabela são renderizados', () => {
    renderWithRedux(<Table />);

    expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/Tag/i)).toBeInTheDocument();
    expect(screen.getByText(/Método de pagamento/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Valor/i).length).toBe(2);
    expect(screen.getAllByText(/Moeda/i).length).toBe(2);
    expect(screen.getByText(/Câmbio utilizado/i)).toBeInTheDocument();
    expect(screen.getByText(/Valor convertido/i)).toBeInTheDocument();
    expect(screen.getByText(/Moeda de conversão/i)).toBeInTheDocument();
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Excluir/i)).toBeInTheDocument();
  });
});
