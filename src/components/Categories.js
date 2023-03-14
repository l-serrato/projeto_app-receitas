import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/DinksContext';
import MealsContext from '../context/SearchContext';

export default function Categories() {
  const { setResultMeals } = useContext(MealsContext);
  const { setResultDrinks } = useContext(DrinksContext);
  const history = useHistory();
  const [categories, setcategories] = useState();
  const [endpoint, setEndpoint] = useState();
  const [toggle, setToggle] = useState();
  const fetchCategoriesMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      json.meals.length = 5;
      setcategories(json.meals);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchCategoriesDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      json.drinks.length = 5;
      setcategories(json.drinks);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const verificaBarra = () => (
      history.location.pathname === '/meals'
        ? fetchCategoriesMeals() : fetchCategoriesDrinks());
    verificaBarra();
  }, [history]);

  useEffect(() => {
    const fetchResultsByCategorie = async () => {
      try {
        const response = await fetch(endpoint);
        const json = await response.json();
        return (history.location.pathname === '/meals'
          ? setResultMeals(json) : setResultDrinks(json));
      } catch (error) {
        return history.location.pathname === '/meals'
          ? setResultMeals(error) : setResultDrinks(error);
      }
    };
    if (endpoint) {
      fetchResultsByCategorie();
    }
  }, [endpoint]);

  const allButon = () => (
    history.location.pathname === '/meals'
      ? setEndpoint('https://www.themealdb.com/api/json/v1/1/search.php?s=') : setEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='));

  const categorieClick = ({ target }) => {
    if (toggle === target.value) {
      allButon();
      setToggle();
    } else {
      setToggle(target.value);
      return (history.location.pathname === '/meals'
        ? setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`)
        : setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.value}`));
    }
  };

  return (
    <div>
      {
        categories
          ? categories.map((cada) => (
            <button
              key={ cada.strCategory }
              data-testid={ `${cada.strCategory}-category-filter` }
              value={ cada.strCategory }
              onClick={ categorieClick }
            >
              { cada.strCategory }
            </button>))
          : 'categorias'
      }
      <button data-testid="All-category-filter" onClick={ allButon }>All</button>
    </div>
  );
}
