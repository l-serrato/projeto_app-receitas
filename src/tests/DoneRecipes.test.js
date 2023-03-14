import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import DoneRecipes from '../components/DoneRecipes';

describe('Teste do componente "DoneRecipes"', () => {
  beforeEach(() => {
    const recipes = [
      {
        id: '52874',
        type: 'meal',
        nationality: 'Italian',
        category: 'beef',
        alcoholicOrNot: 'non-alcoholic',
        name: 'Beef and Mustard Pie',
        image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
        doneDate: '06/03/2023',
        tags: ['pie'],
      },
      {
        id: '178319',
        type: 'drink',
        alcoholicOrNot: 'alcoholic',
        name: 'A1',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        doneDate: '07/03/2023',
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });

  afterEach(() => {
    localStorage.removeItem('doneRecipes');
  });

  it('verifica se o componente renderiza as imagens das receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);
    const title = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(title).toBeInTheDocument();
  });

  test('verifica se "Meals" está sendo renderizado', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImage = screen.getByAltText('Beef and Mustard Pie');
    const recipeName = screen.getByTestId('0-horizontal-name');
    const recipeTopText = screen.getByTestId('0-horizontal-top-text');
    const recipeDoneDate = screen.getByTestId('0-horizontal-done-date');
    const recipeShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const recipeTag = screen.getByTestId('0-pie-horizontal-tag');

    expect(recipeTopText).toHaveTextContent('Italian - beef');
    expect(recipeDoneDate).toHaveTextContent('06/03/2023');
    expect(recipeTag).toHaveTextContent('pie');
    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShareBtn).toBeInTheDocument();
  });

  test('verifica se "Drinks" está sendo renderizado', () => {
    renderWithRouter(<DoneRecipes />);
    const recipeImage = screen.getByAltText('A1');
    const recipeName = screen.getByTestId('1-horizontal-name');
    const recipeTopText = screen.getByTestId('1-horizontal-top-text');
    const recipeDoneDate = screen.getByTestId('1-horizontal-done-date');
    const recipeShareBtn = screen.getByTestId('1-horizontal-share-btn');

    expect(recipeTopText).toHaveTextContent('alcoholic');
    expect(recipeDoneDate).toHaveTextContent('07/03/2023');
    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeShareBtn).toBeInTheDocument();
  });
});
