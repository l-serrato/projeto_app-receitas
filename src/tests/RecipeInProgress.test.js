import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

const mealMock = {
  idMeal: '52775',
  strMeal: 'Vegan Lasagna',
  strCategory: 'Vegan',
  strInstructions: '1) Preheat oven to 180 degrees celcius. \r\n2) Boil vegetables for 5-7 minutes, until soft. Add lentils and bring to a gentle simmer, adding a stock cube if desired. Continue cooking and stirring until the lentils are soft, which should take about 20 minutes. \r\n3) Blanch spinach leaves for a few minutes in a pan, before removing and setting aside. \r\n4) Top up the pan with water and cook the lasagne sheets. When cooked, drain and set aside.\r\n5) To make the sauce, melt the butter and add the flour, then gradually add the soya milk along with the mustard and the vinegar. Cook and stir until smooth and then assemble the lasagne as desired in a baking dish. \r\n6) Bake in the preheated oven for about 25 minutes.',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
  strYoutube: 'https://www.youtube.com/watch?v=VU8cXvlGbvc',
  strIngredient1: 'green red lentils',
  strMeasure1: '1 cups',
  strMeasure2: '1',
  strMeasure3: '1',
  strMeasure4: '1 small',
  strMeasure5: 'sprinking',
  strMeasure6: '150g',
  strMeasure7: '10',
  strMeasure8: '35g',
  strMeasure9: '4 tablespoons',
  strMeasure10: '300ml',
  strMeasure11: '1.5 teaspoons',
  strMeasure12: '1 teaspoon',
  strArea: 'Italian',
  strTags: 'Vegan,Pasta',
};
const doneRecipeMock = {
  alcoholicOrNot:
  '',
  category:
  'Vegan',
  doneDate:
  '2023-03-07T19:31:20.000Z',
  id:
  '52775',
  image:
  'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
  name:
  'Vegan Lasagna',
  nationality:
  'Italian',
  tags:
  ['Vegan', 'Pasta'],
  type:
  'meal' };
const testURL = '/meals/52775/in-progress';
describe('Testes da página Recipe In Progress', () => {
  afterEach(() => jest.clearAllMocks());
  it('Testa se o botão de finalizar, os ingredientes e seu respectivos checkboxes são renderizados corretamente', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ meals: [mealMock] }),
    }));
    const mockDate = new Date(1678217480000);
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate);
    const { history } = renderWithRouter(<App />);
    act(() => history.push(testURL));
    const recipeTitle = await screen.findByTestId('recipe-title');
    const ingredients = await screen.findAllByTestId(/ingredient-step/);
    expect(recipeTitle).toHaveTextContent(mealMock.strMeal);
    expect(ingredients.length).toBe(11);

    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toBeDisabled();
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    const checkedOnStorage0 = JSON.parse(localStorage.getItem('inProgressRecipes')).meals['52775'][0];
    expect(checkedOnStorage0).toBe('checked');

    ingredients.forEach((el) => expect(el).toHaveClass('checked'));
    expect(finishButton).toBeEnabled();
    userEvent.click(finishButton);
    const doneOnStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(doneOnStorage.length).toBe(1);
    expect(doneOnStorage[0]).toEqual(doneRecipeMock);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
    spy.mockClear();
  });
  it('Testa os botões de compartilhar e favoritar', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ meals: [mealMock] }),
    }));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(testURL));
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const shareButton = screen.getByTestId('share-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const mockedWriteText = jest.fn();
    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    await userEvent.click(shareButton);
    expect(mockedWriteText).toHaveBeenCalled();
    jest.resetAllMocks();
  });

  it('Testa funcionalidade das checkboxes', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ meals: [mealMock] }),
    }));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(testURL));

    const ingredients = await screen.findAllByTestId(/ingredient-step/);
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(ingredients[0]).not.toHaveClass();
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals['52775'][0]).toBe('checked');
  });
});

const drinkMock = {
  idDrink: '178319',
  strDrink: 'Aquamarine',
  strCategory: '',
  strAlcoholic: 'Alcoholic',
  strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  strIngredient1: 'Hpnotiq',
  strIngredient2: 'Pineapple Juice',
  strIngredient3: 'Banana Liqueur',
  strMeasure1: '2 oz',
  strMeasure2: '1 oz',
  strMeasure3: '1 oz',
  strArea: '',
  strTags: '',
};
const doneDrinkMock = {
  alcoholicOrNot:
  'Alcoholic',
  category:
  '',
  doneDate:
  '2023-03-07T19:31:20.000Z',
  id:
  '178319',
  image:
  'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  name:
  'Aquamarine',
  nationality:
  '',
  tags:
  [],
  type:
  'drink',
};
const testDrinkURL = '/drinks/178319/in-progress';
describe('Testes da página Recipe In Progress', () => {
  afterEach(() => jest.clearAllMocks());
  it('Testa com página de bebidas', async () => {
    localStorage.clear();
    global.fetch = jest.fn(async () => ({
      json: async () => ({ drinks: [drinkMock] }),
    }));
    const { history } = renderWithRouter(<App />);
    const mockDate = new Date(1678217480000);
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate);
    act(() => history.push(testDrinkURL));
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const shareButton = screen.getByTestId('share-btn');
    expect(favoriteButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toHaveTextContent(drinkMock.strDrink);
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toBeDisabled();
    const ingredients = await screen.findAllByTestId(/ingredient-step/);
    userEvent.click(favoriteButton);
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    const checkedOnStorage0 = JSON.parse(localStorage.getItem('inProgressRecipes')).drinks['178319'][0];
    expect(checkedOnStorage0).toBe('checked');

    userEvent.click(screen.getAllByRole('checkbox')[1]);
    const checkedOnStorage1 = JSON.parse(localStorage.getItem('inProgressRecipes')).drinks['178319'][1];
    expect(checkedOnStorage1).toBe('checked');

    userEvent.click(screen.getAllByRole('checkbox')[2]);
    const checkedOnStorage2 = JSON.parse(localStorage.getItem('inProgressRecipes')).drinks['178319'][2];
    expect(checkedOnStorage2).toBe('checked');

    ingredients.forEach((el) => expect(el).toHaveClass('checked'));
    expect(finishButton).toBeEnabled();
    userEvent.click(finishButton);
    const doneOnStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(doneOnStorage.length).toBe(1);
    expect(doneOnStorage[0]).toEqual(doneDrinkMock);
    spy.mockClear();
  });
});
//
