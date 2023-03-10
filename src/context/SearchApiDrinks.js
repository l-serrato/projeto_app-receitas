import { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import Swal from 'sweetalert2';
import DrinksContext from './DinksContext';

const INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export default function SearchApiDrinks({ children }) {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('name');
  const [resultDrinks, setResultDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async (searchUrl) => {
      try {
        const data = await fetch(searchUrl);
        const json = await data.json();
        return setResultDrinks(json);
      } catch (error) {
        setResultDrinks(error);
      }
    };

    fetchData(endpoint);
  }, [endpoint]);

  const searchDrinks = (e) => {
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

  const onChangeSearchDrink = ({ target: { value } }) => setPesquisa(value);

  const onChangeSelectedCategoryDrink = (event) => (
    setSelectedCategory(event.target.value)
  );

  const drinksValues = useMemo(() => ({
    onChangeSearchDrink,
    onChangeSelectedCategoryDrink,
    searchDrinks,
    selectedCategory,
    pesquisa,
    resultDrinks,
  }), [resultDrinks, pesquisa, selectedCategory]);

  return (
    <DrinksContext.Provider value={ drinksValues }>
      {children}
    </DrinksContext.Provider>
  );
}

SearchApiDrinks.propTypes = {
  children: PropTypes.node,
}.isRequired;
