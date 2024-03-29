import React, { useContext } from 'react';
import MealsContext from '../context/SearchContext';
import Header from './Header';
import RecipeCard from './RecipeCard';
import Categories from './Categories';
import Footer from './Footer';

const START = 0;
const END = 12;

export default function Meals() {
  const { resultMeals } = useContext(MealsContext);
  const mealList = resultMeals.meals?.slice(START, END);

  return (
    <main>
      <Header pageTitle="Meals" />
      <Categories />
      {
        mealList && mealList !== 'no results' ? mealList.map((meal, index) => (
          <RecipeCard
            recipe={ meal }
            key={ index }
            testCard={ `${index}-recipe-card` }
            testName={ `${index}-card-name` }
            testImg={ `${index}-card-img` }
            redirectTo={ `/meals/${meal.idMeal}` }
          />
        ))
          : <p>Nada por aqui... Procure alguma coisa!</p>
      }

      <Footer />
    </main>
  );
}
