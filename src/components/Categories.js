import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Categories() {
  const history = useHistory();
  const [categories, setcategories] = useState();
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

  return (
    <div>
      {
        categories
          ? categories.map((cada) => (
            <button
              key={ cada.strCategory }
              data-testid={ `${cada.strCategory}-category-filter` }
            >
              { cada.strCategory }
            </button>))
          : 'categorias'
      }
    </div>
  );
}
