import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Profile from '../components/Profile';

describe('Teste o componente <Profile />', () => {
  it('Testa se o botão "Done Recipes" redireciona a pessoa para a tela <Done Recipes />', () => {
    renderWithRouter(<Profile />);

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton);
  });

  it('Testa se o botão "Favorite Recipes" redireciona a pessoa para a tela <Favorite Recipes />', () => {
    renderWithRouter(<Profile />);

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesButton);
  });

  it('Testa se o botão "Logout" redireciona a pessoa para a tela <Login /> e se o localStorage é limpo', () => {
    renderWithRouter(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toEqual(null);
  });
});
