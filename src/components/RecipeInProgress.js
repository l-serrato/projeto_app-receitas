import '../styles/RecipeInProgress.css';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
/* import copy from 'clipboard-copy'; */
/* import FavoriteShareBtns from './FavoriteShareBtns';
import { favoriteRecipeLocalStorage } from '../helpers/localStorageFunctions'; */
import Buttons from './Buttons';

export default function RecipeInProgress() {
  const fetchById = (type, id) => fetch(`https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [labelClass, setLabelClass] = useState({});
  /* const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); */
  const [finishButtonDisabled, toggleFinishButtonDisabled] = useState(true);
  const history = useHistory();
  const { pathname } = history.location;
  const params = useParams();
  const { id } = params;
  const recipeName = pathname.includes('/meals') ? 'strMeal' : 'strDrink';
  const recipeThumb = pathname.includes('/meals') ? 'strMealThumb' : 'strDrinkThumb';
  const recipeType = pathname.includes('/meals') ? 'meals' : 'drinks';
  const recipeInfo = Object.keys(recipeDetails).length > 0 ? recipeDetails[recipeType][0]
    : '';
  /* const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : []; */

  const localStorageClasses = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : { [recipeType]: { [id]: { 0: '' } } };

  /* const shareButton = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setLinkCopied(true);
  }; */

  const finishRecipe = () => {
    const data = new Date();
    const doneRecipeDetails = {
      id,
      nationality: recipeDetails[recipeType][0].strArea
        ? recipeDetails[recipeType][0].strArea : '',
      name: recipeDetails[recipeType][0][recipeName],
      category: recipeDetails[recipeType][0].strCategory
        ? recipeDetails[recipeType][0].strCategory : '',
      image: recipeDetails[recipeType][0][recipeThumb],
      tags: recipeDetails[recipeType][0].strTags
        ? recipeDetails[recipeType][0].strTags.split(',') : [],
      alcoholicOrNot: recipeDetails[recipeType][0].strAlcoholic
        ? recipeDetails[recipeType][0].strAlcoholic : '',
      type: recipeType === 'meals' ? 'meal' : 'drink',
      doneDate: data,
    };
    const oldLocalStorage = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...oldLocalStorage, doneRecipeDetails]),
    );
    history.push('/done-recipes');
  };

  /*   const saveFavoriteRecipe = () => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = getFavoritesRecipes ? JSON
      .parse(getFavoritesRecipes) : [];

    const currentFavoriteRecipe = {
      id,
      type: recipeType === 'meals' ? 'meal' : 'drink',
      nationality: recipeType === 'meals' ? recipeDetails[recipeType][0].strArea : '',
      category: recipeDetails[recipeType][0].strCategory,
      alcoholicOrNot: recipeType === 'drinks' ? recipeDetails[recipeType][0]
        .strAlcoholic : '',
      name: recipeType === 'meals' ? recipeDetails[recipeType][0].strMeal
        : recipeDetails[recipeType][0].strDrink,
      image: recipeType === 'meals' ? recipeDetails[recipeType][0].strMealThumb
        : recipeDetails[recipeType][0].strDrinkThumb,
    };

    favoriteRecipeLocalStorage(
      localFavoritesRecipes,
      currentFavoriteRecipe,
      id,
      setIsFavorite,
    );
  }; */

  const handleIngredients = () => {
    const ingredients = [];
    const NUMBER_OF_INGREDIENTS = 20;
    for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
      if (recipeInfo[`strIngredient${i}`]
      && recipeInfo[`strIngredient${i}`] !== null
      && recipeInfo[`strIngredient${i}`] !== '') {
        const ingredient = (
          `${recipeInfo[`strIngredient${i}`]} ${recipeInfo[`strMeasure${i}`]}`
        );
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const labelClassChanger = ({ target }) => {
    const inProgressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    const prevStorage = inProgressStorage || { meals: [], drinks: [] };

    if (target.checked === true) {
      setLabelClass({ [recipeType]: { ...labelClass[recipeType],
        [id]: { ...labelClass[recipeType][id], [target.name]: 'checked' } } });

      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ ...prevStorage,
          [recipeType]: { ...labelClass[recipeType],
            [id]: { ...labelClass[recipeType][id], [target.name]: 'checked' } } }),
      );
    } else {
      setLabelClass({ [recipeType]: { ...labelClass[recipeType],
        [id]: { ...labelClass[recipeType][id], [target.name]: '' } } });

      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ ...prevStorage,
          [recipeType]: { ...labelClass[recipeType],
            [id]: { ...labelClass[recipeType][id], [target.name]: '' } } }),
      );
    }
    const ingredients = handleIngredients();
    if (ingredients.length >= Object.keys(labelClass[recipeType][id]).length - 1) {
      const verifier = [];
      for (let index = 0; index < ingredients.length; index += 1) {
        if (labelClass[recipeType][id][index] === 'checked') {
          verifier.push(labelClass[recipeType][id][index]);
        }
        if (verifier.length === ingredients.length - 1) {
          toggleFinishButtonDisabled(false);
        } else {
          toggleFinishButtonDisabled(true);
        }
      }
    }
  };

  useState(async () => {
    if (pathname.includes('/meals')) {
      setRecipeDetails(await fetchById('meal', id));
    }

    if (pathname.includes('/drinks')) {
      setRecipeDetails(await fetchById('cocktail', id));
    }
    setLabelClass(localStorageClasses);
    /* const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = getFavoritesRecipes ? JSON
      .parse(getFavoritesRecipes) : [];
    setIsFavorite(localFavoritesRecipes.some((el) => el.id === id)); */
  }, []);

  return (
    <div>
      {Object.keys(recipeDetails).length > 0 ? (
        <>
          <Buttons data={ recipeDetails[Object.keys(recipeDetails)][0] } />
          <img data-testid="recipe-photo" src={ recipeInfo[recipeThumb] } alt="" />
          <h1 data-testid="recipe-title">{ recipeInfo[recipeName] }</h1>
          <h2 data-testid="recipe-category">{ recipeInfo.strCategory }</h2>
          <ul data-testid="instructions">
            {handleIngredients().map((ingredient, index) => (
              <li key={ ingredient }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  className={ localStorageClasses[recipeType][id]
                    ? localStorageClasses[recipeType][id][index] : '' }
                  htmlFor={ ingredient }
                >
                  <input
                    name={ index }
                    onChange={ labelClassChanger }
                    className="checkbox"
                    id={ ingredient }
                    type="checkbox"
                    checked={ localStorageClasses[recipeType][id]
                      ? localStorageClasses[recipeType][id][index] : false }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
          <button
            data-testid="finish-recipe-btn"
            disabled={ finishButtonDisabled }
            onClick={ finishRecipe }
          >
            Finalizar Receita

          </button>
        </>
      ) : ''}
    </div>
  );
}
