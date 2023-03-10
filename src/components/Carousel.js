import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Carousel.css';
import Buttons from './Buttons';

function Carousel({ data, ingredients, measure, pathname,
  recommendationsData }) {
  const MAX_RECOMMENDATIONS = 6;

  if (pathname === 'meals') {
    return (
      <div>
        {
          ['idMeal'] in data[pathname][0]
          && Object.values(data)[0].map((el) => (
            <div key={ el.idMeal }>
              <img
                src={ el.strMealThumb }
                alt={ el.strMeal }
                data-testid="recipe-photo"
              />
              <h3 data-testid="recipe-title">{ el.strMeal }</h3>
              <h4 data-testid="recipe-category">{ el.strCategory }</h4>
              {
                ingredients.map((ingredient, index) => (
                  <div key={ index }>
                    <label
                      htmlFor={ `${index}-ingredient` }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      <input
                        type="checkbox"
                        name={ `${index}-ingredient` }
                        id={ `${index}-ingredient` }
                      />
                      {`${ingredient} ${measure[index]}`}
                    </label>
                  </div>
                ))
              }
              <p data-testid="instructions">{el.strInstructions}</p>
              <iframe
                title={ el.strMeal }
                width="420"
                height="315"
                data-testid="video"
                src={ `https://www.youtube.com/embed/${el.strYoutube.replace('https://www.youtube.com/watch?v=', '')}` }
              />
              <Buttons />
              <div className="recommendationsCardDiv">
                { Object.values(recommendationsData)[0].slice(0, MAX_RECOMMENDATIONS)
                  .map((recommendations, index) => (
                    <div key={ index } data-testid={ `${index}-recommendation-card` }>
                      <h3
                        data-testid={ `${index}-recommendation-title` }
                      >
                        { recommendations.strDrink }

                      </h3>
                      <img
                        src={ recommendations.strDrinkThumb }
                        alt={ recommendations.strDrink }
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        }
      </div>
    );
  }
  return (
    <div>
      {
        ['idDrink'] in data[pathname][0]
            && Object.values(data)[0].map((el) => (
              <div key={ el.idDrink }>
                <img
                  src={ el.strDrinkThumb }
                  alt={ el.strDrink }
                  data-testid="recipe-photo"
                />
                <h3 data-testid="recipe-title">{ el.strDrink }</h3>
                <h4 data-testid="recipe-category">{ el.strAlcoholic }</h4>
                {
                  ingredients.map((ingredient, index) => (
                    <div key={ index }>
                      <label
                        htmlFor={ `${index}-ingredient` }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        <input
                          type="checkbox"
                          name={ `${index}-ingredient` }
                          id={ `${index}-ingredient` }
                        />
                        {`${ingredient} ${measure[index]}`}
                      </label>
                    </div>
                  ))
                }
                <p data-testid="instructions">{el.strInstructions}</p>
                <Buttons />
                <div className="recommendationsCardDiv">
                  { Object.values(recommendationsData)[0].slice(0, MAX_RECOMMENDATIONS)
                    .map((recommendations, index) => (
                      <div key={ index } data-testid={ `${index}-recommendation-card` }>
                        <h3
                          data-testid={ `${index}-recommendation-title` }
                        >
                          { recommendations.strMeal }

                        </h3>
                        <img
                          src={ recommendations.strMealThumb }
                          alt={ recommendations.strMeal }
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))
      }
    </div>
  );
}

Carousel.propTypes = {
  data: PropTypes.any,
  recommendationsData: PropTypes.any,
  ingredients: PropTypes.any,
  measure: PropTypes.any,
  pathname: PropTypes.string,
}.isRequired;

export default Carousel;
