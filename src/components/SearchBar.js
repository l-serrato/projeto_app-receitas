import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/DinksContext';
import MealsContext from '../context/SearchContext';

function SearchBar() {
  const history = useHistory(); // hook estranho
  const {
    onChangeSearchMeal,
    onChangeSelectedCategoryMeal,
    searchMeals,
    resultMeals,
    clearMeals,
    pesquisaMeals,
  } = useContext(MealsContext);

  const { meals } = resultMeals;

  const {
    searchDrinks,
    onChangeSelectedCategoryDrink,
    onChangeSearchDrink,
    resultDrinks,
    clearDrinks,
    pesquisaDrinks,
  } = useContext(DrinksContext);

  const { drinks } = resultDrinks;

  const { pathname } = history.location;

  const verifyPathname = (event) => {
    if (pathname === '/drinks') {
      onChangeSelectedCategoryDrink(event);
    } else onChangeSelectedCategoryMeal(event);
  };

  useEffect(() => {
    if (meals?.length === 1) {
      history.push(`/meals/${meals[0].idMeal}`);
      return () => {
        clearMeals();
      };
    }

    if (meals === 'no results' && pathname === '/meals') {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
  }, [meals]);

  useEffect(() => {
    if (drinks?.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
      return () => {
        clearDrinks();
      };
    }

    if (drinks === 'no results' && pathname === '/drinks') {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
  }, [drinks]);

  return (
    <div>
      <form
        onSubmit={
          history.location.pathname === '/drinks' ? searchDrinks : searchMeals
        }
      >
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          value={ pathname === '/drinks' ? pesquisaDrinks : pesquisaMeals }
          onChange={
            pathname === '/drinks'
              ? onChangeSearchDrink : onChangeSearchMeal
          }
        />

        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="category"
            id="ingredient-search-radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ verifyPathname }
          />
          Ingredient
        </label>

        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="category"
            id="name-search-radio"
            data-testid="name-search-radio"
            value="name"
            onClick={ verifyPathname }
          />
          Name
        </label>

        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="category"
            id="first-letter-search-radio"
            value="first letter"
            data-testid="first-letter-search-radio"
            onClick={ verifyPathname }
          />
          First Letter
        </label>

        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
