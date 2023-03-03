import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import DrinksContext from './DinksContext';

export default function SearchApiDrinks({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [resultDrinks, setResultDrinks] = useState([]);

  useEffect(() => {
    if (endpoint !== '') {
      const fetchData = async () => {
        try {
          const data = await fetch(endpoint);
          const json = await data.json();
          return setResultDrinks(json);
        } catch (error) {
          setResultDrinks(error);
        }
      };
      fetchData();
    }
  }, [endpoint]);

  const ingredientes = (prop) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${prop}`;
  const nome = (prop) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${prop}`;
  const primeiraLetra = (prop) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${prop}`;

  const onClickDrinks = ({ target: { name } }) => {
    if (name === 'ingredient') { setEndpoint(ingredientes(pesquisa)); }
    if (name === 'name') { setEndpoint(nome(pesquisa)); }
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

  const onChangeDrinks = ({ target: { value } }) => setPesquisa(value);

  const drinksValues = useMemo(() => ({
    onChangeDrinks,
    onClickDrinks,
    resultDrinks,
  }), [resultDrinks, pesquisa]);

  return (
    <DrinksContext.Provider value={ drinksValues }>
      {children}
    </DrinksContext.Provider>
  );
}

SearchApiDrinks.propTypes = {
  children: PropTypes.node,
}.isRequired;
