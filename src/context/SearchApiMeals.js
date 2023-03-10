import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import MealsContext from './SearchContext';

const INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export default function SearchApiMeals({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [resultMeals, setResultMeal] = useState([]);

  useEffect(() => {
    const fetchData = async (searchUrl) => {
      try {
        const data = await fetch(searchUrl);
        const json = await data.json();
        return setResultMeal(json);
      } catch (error) {
        setResultMeal(error);
      }
    };

    fetchData(endpoint);
  }, [endpoint]);

  const searchMeals = (e) => {
    e.preventDefault();

    if (pesquisa === '' || !pesquisa) {
      if (!Swal) {
        global.alert('Insira um termo de busca.');
      } else {
        return Swal.fire({
          titleText: 'Insira um termo de busca.',
          icon: 'info',
          confirmButtonText: 'Beleza!',
        });
      }
    }

    switch (selectedCategory) {
    case 'ingredient':
      setEndpoint(`${INGREDIENTS_URL}${pesquisa}`);
      break;
    case 'name':
      setEndpoint(`${NAME_URL}${pesquisa}`);
      break;
    case 'first letter':
      return pesquisa.length === 1 ? setEndpoint(`${FIRST_LETTER_URL}${pesquisa}`)
        : Swal.fire({
          titleText: 'Your search must have only 1 (one) character',
        });
    default:
      console.log('Default case :D');
    }
  };

  const onChangeSearchMeal = ({ target: { value } }) => setPesquisa(value);

  const onChangeSelectedCategoryMeal = (event) => (
    setSelectedCategory(event.target.value)
  );

  const clearResults = () => {
    setResultMeal([]);
    setPesquisa();
  };

  const mealsValues = useMemo(() => ({
    onChangeSelectedCategoryMeal,
    onChangeSearchMeal,
    searchMeals,
    clearResults,
    selectedCategory,
    pesquisa,
    resultMeals,
  }), [resultMeals, pesquisa, selectedCategory]);

  return (
    <MealsContext.Provider value={ mealsValues }>
      {children}
    </MealsContext.Provider>
  );
}

SearchApiMeals.propTypes = {
  children: PropTypes.node,
}.isRequired;
