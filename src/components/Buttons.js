import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function Buttons({ data }) {
  const history = useHistory();
  const [textCopy, setTextCopy] = useState(false);
  const [localFavorite, setLocal] = useState(
    JSON.parse(window.localStorage.getItem('favoriteRecipes')),
  );
  const [icon, setIcon] = useState(whiteHeartIcon);
  useEffect(() => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(localFavorite));
    const isFavorite = () => {
      if (localFavorite !== null) {
        const pathname = history.location.pathname.split('/');
        const find = localFavorite.find((cada) => cada.id === pathname[2]);
        return (find ? setIcon(blackHeartIcon) : setIcon(whiteHeartIcon));
      }
    };
    isFavorite();
  }, [localFavorite, icon]);

  const shareButton = () => {
    const url = `http://localhost:3000${history.location.pathname}`;
    copy(url);
    setTextCopy(true);
    const time = 5000;
    setTimeout(() => setTextCopy(false), time);
  };

  const addFavorite = (values) => {
    if (localFavorite !== null) {
      const filter = localFavorite.filter((cada) => cada.id !== values.id);
      const sort = (a, b) => {
        const menosUm = -1;
        const maisUm = 1;
        if (a.id < b.id) return menosUm;
        if (a.id > b.id) return maisUm;
        return 0;
      };
      if (icon === blackHeartIcon) {
        setLocal(filter.sort(sort));
      } else {
        filter.push(values);
        setLocal(filter.sort(sort));
      }
    } else {
      setLocal([values]);
    }
  };

  const saveFavorite = () => {
    const pathname = history.location.pathname.split('/');
    if (pathname[1] === 'meals') {
      const { strArea, idMeal, strCategory, strMeal, strMealThumb } = data;
      const values = {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (icon === blackHeartIcon) {
        const filter = localFavorite.filter((cada) => cada.id !== values.id);
        setLocal(filter);
      }
      addFavorite(values);
    } else {
      const {
        idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic,
      } = data;
      const values = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      if (icon === blackHeartIcon) {
        const filter = localFavorite.filter((cada) => cada.id !== values.id);
        setLocal(filter);
      }
      addFavorite(values);
    }
  };

  return (
    <div>
      <button data-testid="share-btn" onClick={ shareButton }>
        <img alt="shareIcon" src={ shareIcon } />
      </button>
      <button data-testid="favorite-btn" onClick={ () => saveFavorite() } src={ icon }>
        <img alt="heartIcon" src={ icon } />
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
