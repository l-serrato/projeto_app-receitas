import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteShareBtns({
  doneRecipes,
  id,
  inProgressRecipes,
  linkCopied,
  shareButton,
  saveFavoriteRecipe,
  isFavorite,
  pathname,
  mustHaveStartButton,
}) {
  const history = useHistory();
  return (
    <div>
      {
        !mustHaveStartButton || doneRecipes.some((el) => (el.id === id))
          // caso o id da receita atual seja igual ao id salvo na chave doneRecipes do localStorage, o botão desaparece//
          ? '' : (
            <button
              className="StartContinueButton"
              data-testid="start-recipe-btn"
              onClick={ () => {
                const inProgressStorage = JSON.parse(
                  localStorage.getItem('inProgressRecipes'),
                );
                const prevStorage = inProgressStorage || { meals: [], drinks: [] };
                prevStorage[pathname] = { [`${id}`]: [] };
                localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
                history.push(`/${pathname}/${id}/in-progress`);
              } }
            >
              {
                inProgressRecipes[pathname][id] ? 'Continue Recipe' : 'Start Recipe'
                // caso o id da receita atual esteja salvo na chave inProgressRecipes do localStorage o texto do botão muda para Continue Recipe //
              }
            </button>
          )
      }
      {linkCopied ? <p>Link copied!</p> : ''}
      <div className="recipeDetailsButtons">
        <button
          onClick={ shareButton }
          data-testid="share-btn"
        >
          <img
            src={ shareIcon }
            alt=""
          />
        </button>
        <button
          onClick={ saveFavoriteRecipe }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

FavoriteShareBtns.propTypes = {
  doneRecipes: PropTypes.shape({
    some: PropTypes.func,
  }),
  id: PropTypes.any,
  inProgressRecipes: PropTypes.any,
  isFavorite: PropTypes.any,
  linkCopied: PropTypes.any,
  saveFavoriteRecipe: PropTypes.any,
  shareButton: PropTypes.any,
}.isRequired;

export default FavoriteShareBtns;
