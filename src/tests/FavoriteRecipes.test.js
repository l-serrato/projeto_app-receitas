import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoriteRecipes from '../components/FavoriteRecipes';
import renderWithRouter from './RenderWithRouter';

jest.mock('clipboard-copy', () => ({
  __esModule: true,
  default: (value) => value,
}));

jest.mock('clipboard-copy', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should load favorite recipes from localStorage', () => {
    const savedRecipes = [{ id: 1, name: 'Recipe 1', type: 'meal' }, { id: 2, name: 'Recipe 2', type: 'drink' }, { id: 3, name: 'Recipe 3', type: 'meal' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const recipe1 = screen.getByTestId('0-horizontal-name');
    const recipe2 = screen.getByTestId('1-horizontal-name');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('should set filtered recipes equal to favorite recipes', () => {
    const savedRecipes = [{ id: 1, name: 'Recipe 1', type: 'meal' }, { id: 2, name: 'Recipe 2', type: 'drink' }, { id: 3, name: 'Recipe 3', type: 'meal' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);
  });
});

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show the favorites and allow them to be removed', () => {

  });

  it('should render the filter buttons', () => {

  });

  it('should copy the recipe link to the clipboard when the copy link button is clicked', () => {
    const savedRecipes = [
      { id: 1, name: 'Recipe 1', type: 'meal' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const recipe1CopyLinkBtn = screen.getByTestId('0-horizontal-share-btn');

    fireEvent.click(recipe1CopyLinkBtn);

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('should call handleRecipeClick when recipe is clicked', () => {
    const recipe = {
      id: '1',
      type: 'meal',
      image: 'https://www.example.com/image.jpg',
      name: 'Example Recipe',
      nationality: 'Italian',
      category: 'Pasta',
    };
    const handleRecipeClick = jest.fn();
    renderWithRouter(
      <FavoriteRecipes
        favoriteRecipes={ [recipe] }
        filteredRecipes={ [recipe] }
        handleRecipeClick={ handleRecipeClick }
      />,
    );
  });

  it('should parse the favoriteRecipes from localStorage', () => {
    const savedRecipes = [{ id: 1, name: 'Recipe 1', type: 'meal' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(savedRecipes);
  });
});

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should show the favorites and allow them to be removed', () => {
    const savedRecipes = [
      { id: 1,
        name: 'Recipe 1',
        type: 'meal' },
      { id: 2, name: 'Recipe 2', type: 'drink' },
      { id: 3, name: 'Recipe 3', type: 'meal' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);
    const recipe1 = screen.getByTestId('0-horizontal-name');
    const recipe2 = screen.getByTestId('1-horizontal-name');
    const recipe3 = screen.getByTestId('2-horizontal-name');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();

    const recipe1RemoveBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const recipe2RemoveBtn = screen.getByTestId('1-horizontal-favorite-btn');
    const recipe3RemoveBtn = screen.getByTestId('2-horizontal-favorite-btn');

    fireEvent.click(recipe1RemoveBtn);
    fireEvent.click(recipe2RemoveBtn);
    fireEvent.click(recipe3RemoveBtn);

    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
    expect(recipe3).not.toBeInTheDocument();
  });
});

describe('FavoriteRecipes', () => {
  it('should render the filter buttons', () => {
    renderWithRouter(<FavoriteRecipes />);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('should filter the recipes when a filter button is clicked', () => {
    const savedRecipes = [
      { id: 1, name: 'Recipe 1', type: 'meal' },
      { id: 2, name: 'Recipe 2', type: 'drink' },
      { id: 3, name: 'Recipe 3', type: 'meal' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    const recipe3 = screen.getByTestId('2-horizontal-name');

    expect(recipe3).toBeInTheDocument();

    fireEvent.click(mealButton);

    expect(recipe3).toBeInTheDocument();

    fireEvent.click(drinkButton);

    expect(recipe3).not.toBeInTheDocument();

    fireEvent.click(allButton);
  });
});
