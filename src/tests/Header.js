import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRedux } from './helpers/renderWith';
import Header from '../components/Header';

describe('Verifica a renderizaçao do componente Header', () => {
  test('Verifica se o email do usuário é renderizado', () => {
    const INITIAL_STATE = {
      user: { email: 'batatinhaquando@nasce.com', },
    }

    renderWithRedux(<Header />, { initialState: INITIAL_STATE, });

    expect(screen.getByText('batatinhaquando@nasce.com')).toBeInTheDocument();
  });

  test('Verifica se o total é renderizado', () => {
    const INITIAL_STATE = {
      wallet: { total: '200', },
    }

    renderWithRedux(<Header />, { initialState: INITIAL_STATE, });

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('BRL')).toBeInTheDocument();
  });
});
