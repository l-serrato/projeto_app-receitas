import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function Buttons({ data }) {
  const history = useHistory();
  const [textCopy, setTextCopy] = useState(false);

  const shareButton = () => {
    const url = `http://localhost:3000${history.location.pathname}`;
    copy(url);
    setTextCopy(true);
    const time = 5000;
    setTimeout(() => setTextCopy(false), time);
  };

  const saveFavorite = () => {
    const pathname = history.location.pathname.split('/');
    if (pathname[1] === 'meals') {
      const { strArea, idMeal, strCategory, strMeal, strMealThumb } = data;
      const values = [
        {
          id: idMeal,
          type: 'meal',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(values));
    } else {
      const {
        idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic,
      } = data;
      const values = [
        {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(values));
    }
  };
  return (
    <div>
      <button data-testid="share-btn" onClick={ shareButton }>
        <img alt="shareIcon" src={ shareIcon } />
      </button>

      <button data-testid="favorite-btn" onClick={ saveFavorite }>

        <img alt="heartIcon" src={ whiteHeartIcon } />
      </button>
      {textCopy && (
        <Alert variant="success" onClose={ () => setTextCopy(false) } dismissible>
          <Alert.Heading>Link copied!</Alert.Heading>
        </Alert>)}
    </div>
  );
}

Buttons.propTypes = {
  data: PropTypes.any,
}.isRequired;
