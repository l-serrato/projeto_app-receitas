import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import MealsContext from './SearchContext';

const INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export default function SearchApiMeals({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisaMeals, setPesquisa] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [resultMeals, setResultMeals] = useState([]);

  useEffect(() => {
    const fetchData = async (searchUrl) => {
      try {
        const data = await fetch(searchUrl);
        const json = await data.json();

        if (!json.meals) {
          return setResultMeals({ meals: 'no results' });
        }

        return setResultMeals(json);
      } catch (error) {
        setResultMeals(error);
      }
    };

    fetchData(endpoint);
  }, [endpoint]);

  const searchMeals = (e) => {
    e.preventDefault();

    if (pesquisaMeals === '' || !pesquisaMeals) {
      global.alert('Insira um termo de busca.');
    }

    switch (selectedCategory) {
    case 'ingredient':
      setEndpoint(`${INGREDIENTS_URL}${pesquisaMeals}`);
      break;
    case 'name':
      setEndpoint(`${NAME_URL}${pesquisaMeals}`);
      break;
    case 'first letter':
      return pesquisaMeals.length === 1
        ? setEndpoint(`${FIRST_LETTER_URL}${pesquisaMeals}`)
        : global.alert('Your search must have only 1 (one) character');
    default:
      console.log('Default case :D');
    }
  };

  const onChangeSearchMeal = ({ target: { value } }) => setPesquisa(value);

  const onChangeSelectedCategoryMeal = (event) => (
    setSelectedCategory(event.target.value)
  );

  const clearMeals = () => {
    setResultMeals([]);
    setPesquisa('');
  };

  const mealsValues = useMemo(() => ({
    onChangeSelectedCategoryMeal,
    onChangeSearchMeal,
    searchMeals,
    clearMeals,
    selectedCategory,
    pesquisaMeals,
    resultMeals,
  }), [resultMeals, pesquisaMeals, selectedCategory]);

  return (
    <MealsContext.Provider value={ mealsValues }>
      {children}
    </MealsContext.Provider>
  );
}

SearchApiMeals.propTypes = {
  children: PropTypes.node,
}.isRequired;
