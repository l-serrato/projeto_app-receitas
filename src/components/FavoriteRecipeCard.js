import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import './styles/FavoriteRecipeCard.css';

function FavoriteRecipeCard({ index, favorite, removeFavoriteRecipe }) {
  const { image, category, name, nationality, type, alcoholicOrNot, id } = favorite;
  const [linkCopied, setLinkCopied] = useState(false);

  const path = type === 'meal' ? 'meals' : 'drinks';

  const shareButton = () => {
    if (type === 'drink') {
      copy(`http://localhost:3000/drinks/${id}`);
      setLinkCopied(true);
    } else {
      copy(`http://localhost:3000/meals/${id}`);
      setLinkCopied(true);
    }
  };

  return (
    <div>
      <Link to={ `${path}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="FavoriteRecipeCardIMG"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h3>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'meal'
            ? ` ${nationality} - ${category}`
            : alcoholicOrNot
        }
      </p>
      {linkCopied ? <p>Link copied!</p> : ''}
      <button onClick={ shareButton }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt=""
        />
      </button>
      <button onClick={ () => removeFavoriteRecipe(id) }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt=""
        />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  favorite: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;

export default FavoriteRecipeCard;
