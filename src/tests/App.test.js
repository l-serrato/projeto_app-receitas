import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';
import renderWithRouter from './RenderWithRouter';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';
const testIdButton = 'login-submit-btn';
const validEmail = 'email@email.com';
const validPassword = '1234567';

const clickButton = () => {
  const buttonEnter = screen.getByTestId(testIdButton);
  userEvent.click(buttonEnter);
};

const fillInputCorrect = () => {
  const inputEmail = screen.getByTestId(testIdEmail);
  const inputPassword = screen.getByTestId(testIdPassword);
  userEvent.type(inputPassword, validPassword);
  userEvent.type(inputEmail, validEmail);
};

describe('1 - Testando a página de login', () => {
  it('2 - Testa se possui input de email, senha, e o botão de entrar existem', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const buttonEnter = screen.getByTestId(testIdButton);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  it('3 - Testa se o usuário consegue digitar o email', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(testIdEmail);

    userEvent.type(inputEmail, 'Name');
    expect(inputEmail.value).toBe('Name');
  });

  it('4 - Testa se o usuário consegue digitar a senha', () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId(testIdPassword);

    userEvent.type(inputPassword, 'Senha');
    expect(inputPassword.value).toBe('Senha');
  });

  it('5 - Testa se o botão fica habilitado caso receba uma senha e email válido', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const buttonEnter = screen.getByTestId(testIdButton);

    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputPassword, validPassword);
    userEvent.type(inputEmail, 'xablau@@');
    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputPassword, '123456');
    userEvent.type(inputEmail, validEmail);
    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputPassword, validPassword);
    userEvent.type(inputEmail, validEmail);
    expect(buttonEnter).toBeInTheDocument();
  });

  it('6 - Testa se ao clicar no botão, fica salvo no localstorage os tokens', () => {
    renderWithRouter(<Login />);
    fillInputCorrect();
    localStorage.clear();
    const storeMeals = localStorage.getItem('mealsToken');
    const storeCocktails = localStorage.getItem('cocktailsToken');
    expect(storeMeals).toBe(null);
    expect(storeCocktails).toBe(null);
    clickButton();
    const storeMealsAfter = localStorage.getItem('mealsToken');
    const storeCocktailsAfter = localStorage.getItem('cocktailsToken');
    expect(storeMealsAfter).toBe('1');
    expect(storeCocktailsAfter).toBe('1');
  });

  it('7 - Testa se ao clicar no botão, fica salvo no localstorage o email', () => {
    renderWithRouter(<Login />);
    fillInputCorrect();
    localStorage.clear();
    const store = localStorage.getItem('user');
    expect(store).toBe(null);
    clickButton();
    const storeAfter = localStorage.getItem('user');
    expect(storeAfter).toBe(`{"email":"${validEmail}"}`);
  });

  it('8 - Testa se ao clicar no botão a pagina é redirecionada para meals', () => {
    const { history } = renderWithRouter(<Login />);
    fillInputCorrect();
    clickButton();
    expect(history.location.pathname).toBe('/meals');
  });
});
