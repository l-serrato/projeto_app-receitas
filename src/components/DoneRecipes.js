import React from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipes);
  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {doneRecipes?.map((recipe, index) => (
        recipe.type === 'meal' ? (
          <div key={ recipe.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              label="share"
            />
            {recipe.tags.map((tag, i) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>{tag}</p>
            ))}
          </div>
        )
          : (
            <div key={ recipe.id }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                label="share"
              />

            </div>)

      ))}

    </div>
  );
}
