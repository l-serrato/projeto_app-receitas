import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import DrinksContext from './DinksContext';

const INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export default function SearchApiDrinks({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisaDrinks, setPesquisa] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [resultDrinks, setResultDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async (searchUrl) => {
      try {
        const data = await fetch(searchUrl);
        const json = await data.json();

        if (!json.drinks) {
          return setResultDrinks({ drinks: 'no results' });
        }

        return setResultDrinks(json);
      } catch (error) {
        setResultDrinks(error);
      }
    };

    fetchData(endpoint);
  }, [endpoint]);

  const searchDrinks = (e) => {
    e.preventDefault();

    if (pesquisaDrinks === '' || !pesquisaDrinks) {
      global.alert('Insira um termo de busca.');
    }

    switch (selectedCategory) {
    case 'ingredient':
      setEndpoint(`${INGREDIENTS_URL}${pesquisaDrinks}`);
      break;
    case 'name':
      setEndpoint(`${NAME_URL}${pesquisaDrinks}`);
      break;
    case 'first letter':
      return pesquisaDrinks.length === 1
        ? setEndpoint(`${FIRST_LETTER_URL}${pesquisaDrinks}`)
        : global.alert('Your search must have only 1 (one) character');
    default:
      console.log('Default case :D');
    }
  };

  const onChangeSearchDrink = ({ target: { value } }) => setPesquisa(value);

  const onChangeSelectedCategoryDrink = (event) => (
    setSelectedCategory(event.target.value)
  );

  const clearDrinks = () => {
    setPesquisa('');
    setResultDrinks([]);
  };

  const drinksValues = useMemo(() => ({
    onChangeSearchDrink,
    onChangeSelectedCategoryDrink,
    searchDrinks,
    clearDrinks,
    selectedCategory,
    pesquisaDrinks,
    resultDrinks,
  }), [resultDrinks, pesquisaDrinks, selectedCategory]);

  return (
    <DrinksContext.Provider value={ drinksValues }>
      {children}
    </DrinksContext.Provider>
  );
}

SearchApiDrinks.propTypes = {
  children: PropTypes.node,
}.isRequired;
