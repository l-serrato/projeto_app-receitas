import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/DinksContext';
import MealsContext from '../context/SearchContext';

function SearchBar() {
  const history = useHistory(); // hook estranho
  const { onChangeMeals, onClickMeals } = useContext(MealsContext);
  const { onChangeDrinks, onClickDrinks } = useContext(DrinksContext);

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={
          history.location.pathname === '/drinks' ? onChangeDrinks : onChangeMeals
        }
      />
      <input
        type="radio"
        name="ingredient"
        id=""
        data-testid="ingredient-search-radio"
        onClick={
          (e) => (
            history.location.pathname === '/drinks' ? onClickDrinks(e) : onClickMeals(e))
        }
      />
      ingredient
      <input
        type="radio"
        name="name"
        id=""
        data-testid="name-search-radio"
        onClick={
          (e) => (
            history.location.pathname === '/drinks' ? onClickDrinks(e) : onClickMeals(e))
        }
      />
      name
      <input
        type="radio"
        name="first letter"
        id=""
        data-testid="first-letter-search-radio"
        onClick={
          (e) => (
            history.location.pathname === '/drinks' ? onClickDrinks(e) : onClickMeals(e))
        }
      />
      First letter
      <button
        data-testid="exec-search-btn"
        name="search"
        onClick={
          (e) => (
            history.location.pathname === '/drinks' ? onClickDrinks(e) : onClickMeals(e))
        }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
