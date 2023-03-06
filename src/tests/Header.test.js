import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import Header from '../components/Header';

describe('1 - Testando o componente Header', () => {
  it('Verifica se ao clicar no botão: "Search" é renderizada a barra de busca', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBTN = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'xablau@xablau.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginBTN);

    const searchBTN = screen.getByTestId('search-top-btn');
    userEvent.click(searchBTN);
  });

  it('Verifica se na rota "/drinks" o <Header/ > é renderizado', async () => {
    // IMPROVISEI O REDIRECIONAMENTO DA TELA, POIS AINDA NÂO POSSUÍMOS ACESSO À TELA DE DRINKS
    // DEPOIS VAMOS PRECISAR REFAZER ESSE TESTE
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/drinks');
    });
  });

  it('Verifica se ao clicar no botão de "profile" é redirecionado para á pagina de "profile"', () => {
    renderWithRouter(<App />);
    const profileBTN = screen.getByTestId('profile-top-btn');
    expect(profileBTN).toBeInTheDocument();
    userEvent.click(profileBTN);
  });
});
