import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import MealsContext from './SearchContext';

export default function SearchApiMeals({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [resultMeals, setResultMeal] = useState([]);

  useEffect(() => {
    // console.log(endpoint !== '');
    if (endpoint !== '') {
      const fetchData = async () => {
        try {
          const data = await fetch(endpoint);
          const json = await data.json();
          return setResultMeal(json);
        } catch (error) {
          setResultMeal(error);
        }
      };
      fetchData();
    }
  }, [endpoint]);

  const ingredientes = (prop) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${prop}`;
  const nome = (prop) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${prop}`;
  const primeiraLetra = (prop) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${prop}`;

  const onClickMeals = ({ target: { name } }) => {
    if (name === 'ingredient') { setEndpoint(ingredientes('')); }
    if (name === 'name') { setEndpoint(nome('')); }
    if (name === 'first letter') {
      return pesquisa.length <= 1
        && setEndpoint(primeiraLetra(''));
    }
    if (name === 'search') {
      return pesquisa.length > 1 && endpoint === primeiraLetra('')
        ? global.alert('Your search must have only 1 (one) character')
        : setEndpoint(`${endpoint}${pesquisa}`);
    }
  };

  const onChangeMeals = ({ target: { value } }) => setPesquisa(value);

  const mealsValues = useMemo(() => ({
    onChangeMeals,
    onClickMeals,
    resultMeals,
  }), [resultMeals, pesquisa]);

  return (
    <MealsContext.Provider value={ mealsValues }>
      {children}
    </MealsContext.Provider>
  );
}

SearchApiMeals.propTypes = {
  children: PropTypes.node,
}.isRequired;
