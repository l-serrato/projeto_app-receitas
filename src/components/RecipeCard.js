import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, testName, testImg, testCard, redirectTo }) {
  const receivedData = Object.values(recipe);
  const pathname = redirectTo.split('/');
  const string = pathname[1][0] === 'm' ? 'Meal' : 'Drink';

  const findThumbnailIndex = (element) => element.includes('Thumb');

  const recipeData = {
    recipeId: recipe[`id${string}`],
    recipeName: recipe[`str${string}`],
    recipeImg: `${receivedData[
      Object.keys(recipe).findIndex(findThumbnailIndex)
    ]}/preview`,
  };

  return (
    <div data-testid={ testCard }>
      <p data-testid={ testName }>{ recipeData.recipeName }</p>
      <Link to={ redirectTo }>
        <img
          src={ recipeData.recipeImg }
          alt={ recipeData.recipeName }
          data-testid={ testImg }
        />
      </Link>

    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  testName: PropTypes.string,
  testImg: PropTypes.string,
  testCard: PropTypes.string,
  redirectTo: PropTypes.string,
}.isRequired;
