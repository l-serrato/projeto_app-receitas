import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from './Carousel';

function RecipeDetails() {
  const history = useHistory();
  const pathname = history.location.pathname.includes('meals') ? 'meals' : 'drinks';
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState({ [pathname]: [{}] });
  const [recommendationsData, setRecommendationsData] = useState({ [pathname]: [{}] });
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({ drinks: {}, meals: {} });

  const fetchUrl = async (url, setFunc) => {
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    setFunc(result);
    return result;
  };

  useEffect(() => {
    const getData = async () => {
      if (history.location.pathname.includes('meals')) {
        await fetchUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, setData);
        await fetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setRecommendationsData);
      }
    };
    const getData2 = async () => {
      if (history.location.pathname.includes('drinks')) {
        await fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, setData);
        await fetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=', setRecommendationsData);
      }
    };
    getData();
    getData2();

    const getDoneRecipes = localStorage.getItem('doneRecipes');
    const localDoneRecipes = getDoneRecipes ? JSON.parse(getDoneRecipes) : [];
    setDoneRecipes(localDoneRecipes);

    const getInProgressRecipes = localStorage.getItem('inProgressRecipes');
    const localInProgressRecipes = getInProgressRecipes
      ? JSON.parse(getInProgressRecipes) : { drinks: {}, meals: {} };
    setInProgressRecipes(localInProgressRecipes);
    // console.log(`${id}/in-progress`);
  }, [id, pathname]);

  const nameBTN = (name) => {
    if (name === 'meals' && Object.keys(inProgressRecipes.meals).includes(id)) {
      return 'Continue Recipe';
    }
    if (name === 'drinks' && Object.keys(inProgressRecipes.drinks).includes(id)) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

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
        <Carousel
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
                onClick={ () => history.push(`${id}/in-progress`) }
              >
                { nameBTN(pathname.includes('meals') ? 'meals' : 'drinks') }
              </button>
            )
        }
      </div>
    );
  }

  return (
    <div className="recipeDetailsContainer">
      <Carousel
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
              onClick={ () => history.push(`${id}/in-progress`) }
            >
              { nameBTN(pathname.includes('meals') ? 'meals' : 'drinks') }
            </button>
          )
      }
    </div>
  );
}

export default RecipeDetails;
