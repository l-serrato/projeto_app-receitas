import React, { useContext } from 'react';
import DrinksContext from '../context/DinksContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import RecipeCard from './RecipeCard';

const START = 0;
const END = 12;

export default function Drinks() {
  const { resultDrinks } = useContext(DrinksContext);
  const drinkList = resultDrinks.drinks?.slice(START, END);

  return (
    <main>
      <Header pageTitle="Drinks" />
      <Categories />
      {
        drinkList && drinkList !== 'no results' ? drinkList.map((drink, index) => (
          <RecipeCard
            recipe={ drink }
            key={ index }
            testCard={ `${index}-recipe-card` }
            testName={ `${index}-card-name` }
            testImg={ `${index}-card-img` }
            redirectTo={ `/drinks/${drink.idDrink}` }
          />
        ))
          : <p>Nada por aqui... Procure alguma coisa!</p>
      }
      <Footer />
    </main>

  );
}
