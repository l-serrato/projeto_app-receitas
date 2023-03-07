import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

describe('Testes do componente "Footer"', () => {
  it('verifica se o botão "meals" está clicável na tela.', () => {
    renderWithRouter(<Drinks />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
  });
  it('verifica se o botão "drinks" está clicável na tela', () => {
    renderWithRouter(<Meals />);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
  });
});
