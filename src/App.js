import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Recipe from './components/Recipe';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Login /> } />
      <Route exact path="/meals" render={ (props) => <Meals { ...props } /> } />
      <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
      <Route exact path="/drinks" render={ (props) => <Drinks { ...props } /> } />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => <DoneRecipes { ...props } /> }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => <FavoriteRecipes { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id-da-receita"
        render={ (props) => <Recipe { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id-da-receita"
        render={ (props) => <Recipe { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        render={ (props) => <Recipe { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        render={ (props) => <Recipe { ...props } /> }
      />

    </Switch>
  );
}

export default App;
