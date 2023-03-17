import React, { useEffect, useState } from 'react';
import FavoriteRecipeCard from './FavoriteRecipeCard';
import Header from './Header';

export default function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  const removeFavoriteRecipe = (id) => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = JSON.parse(getFavoritesRecipes);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(localFavoritesRecipes.filter((el) => el.id !== id)));
    setFavoritesRecipes(localFavoritesRecipes.filter((el) => el.id !== id));
  };

  useEffect(() => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = getFavoritesRecipes ? JSON
      .parse(getFavoritesRecipes) : [];
    setFavoritesRecipes(localFavoritesRecipes);
  }, []);

  const AllFilter = () => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    setFavoritesRecipes(JSON.parse(getFavoritesRecipes));
  };

  const MealsFilter = () => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = JSON.parse(getFavoritesRecipes);
    setFavoritesRecipes(localFavoritesRecipes.filter((el) => el.type === 'meal'));
  };

  const DrinksFilter = () => {
    const getFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const localFavoritesRecipes = JSON.parse(getFavoritesRecipes);
    setFavoritesRecipes(localFavoritesRecipes.filter((el) => el.type === 'drink'));
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" hasSearchIcon={ false } />
      <button data-testid="filter-by-all-btn" onClick={ AllFilter }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ MealsFilter }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ DrinksFilter }>
        Drinks
      </button>
      {
        favoritesRecipes.map((favorite, index) => (
          <FavoriteRecipeCard
            key={ index }
            index={ index }
            favorite={ favorite }
            removeFavoriteRecipe={ removeFavoriteRecipe }
            AllFilter={ AllFilter }
            MealsFilter={ MealsFilter }
            DrinksFilter={ DrinksFilter }
          />
        ))
      }
    </div>
  );
}
