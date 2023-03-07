import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CurrentRecipeDetails from './CurrentRecipeDetails';

function RecipeDetails() {
  const history = useHistory();
  const pathname = history.location.pathname.includes('meals') ? 'meals' : 'drinks';
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({ [pathname]: [{}] });
  const [recommendationsData, setRecommendationsData] = useState({ [pathname]: [{}] });
  const [doneRecipes, setDoneRecipes] = useState([]);

  const fetchUrl = async (url, setFunc) => {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    setFunc(result);
    return result;
  };

  useEffect(() => {
    const getData = async () => {
      console.log('chamada a api', pathname);
      if (history.location.pathname.includes('meals')) {
        console.log('if');
        await fetchUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, setData);
        await fetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setRecommendationsData);
      }
    };
    const getData2 = async () => {
      console.log('chamada a api', pathname);
      if (history.location.pathname.includes('drinks')) {
        console.log('else if');
        await fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, setData);
        await fetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=', setRecommendationsData);
      }
    };
    getData();
    getData2();

    const getDoneRecipes = localStorage.getItem('doneRecipes');
    const localDoneRecipes = getDoneRecipes ? JSON.parse(getDoneRecipes) : [];
    setDoneRecipes(localDoneRecipes);
  }, [id, pathname]);

  const ingredientsKeys = Object.keys(data[pathname][0])
    .filter((el) => el.includes('strIngredient'));
  const ingredients = ingredientsKeys.map((el) => data[pathname][0][el])
    .filter((el) => el !== null && el !== '');
  const measureKeys = Object.keys(data[pathname][0])
    .filter((el) => el.includes('strMeasure'));
  const measure = measureKeys.map((el) => data[pathname][0][el])
    .filter((el) => el !== null && el !== '');

  if (pathname === 'meals') {
    return (
      <div className="recipeDetailsContainer">
        <CurrentRecipeDetails
          data={ data }
          ingredients={ ingredients }
          measure={ measure }
          pathname={ pathname }
          recommendationsData={ recommendationsData }
        />
        {
          doneRecipes.some((el) => (el.id === id))
            ? '' : (
              <button
                data-testid="start-recipe-btn"
                style={ { position: 'fixed',
                  bottom: '0px' } }
              >
                Start Recipe
              </button>
            )
        }
      </div>
    );
  }

  return (
    <div className="recipeDetailsContainer">
      <CurrentRecipeDetails
        data={ data }
        ingredients={ ingredients }
        measure={ measure }
        pathname={ pathname }
        recommendationsData={ recommendationsData }
      />
      {
        doneRecipes.some((el) => (el.id === id))
          ? '' : (
            <button
              data-testid="start-recipe-btn"
              style={ { position: 'fixed',
                bottom: '0px' } }
            >
              Start Recipe
            </button>
          )
      }
    </div>
  );
}

export default RecipeDetails;
