import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MealsContext from '../context/SearchContext';
import Header from './Header';
import RecipeCard from './RecipePage';

export default function Meals() {
  const [input, setInput] = useState('');
  const { resultMeals, clearResults } = useContext(MealsContext);
  const { meals } = resultMeals;
  const history = useHistory();

  return (
    <main>
      <Header pageTitle="Meals" />
      <input
        type="text"
        placeholder="insira um nome"
        onChange={ (e) => setInput(e.target.value) }
      />
    </main>
  );
}
