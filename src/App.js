import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
// import Footer from './components/Footer';
import Drinks from './components/Drinks';
import Recipe from './components/Recipe';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
/* import Foods from './components/Foods'; */
import Meals from './components/Meals';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <BrowserRouter>

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
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:id_da_receita/in_progress"
          render={ (props) => <Recipe { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id_da_receita/in_progress"
          render={ (props) => <Recipe { ...props } /> }
        />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
