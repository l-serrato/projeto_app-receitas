import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
// import Footer from './components/Footer';
import Drinks from './components/Drinks';
import RecipePage from './components/RecipePage';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Meals from './components/Meals';
import SearchApiDrinks from './context/SearchApiDrinks';
import SearchApiMeals from './context/SearchApiMeals';
import NotFound from './components/NotFound';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <BrowserRouter>
      <SearchApiDrinks>
        <SearchApiMeals>
          <Switch>
            <Route exact path="/" render={ () => <Login /> } />
            <Route
              exact
              path="/meals"
              render={ (props) => (
                <Meals { ...props } />
              ) }
            />
            <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
            <Route
              exact
              path="/drinks"
              render={
                (props) => <Drinks { ...props } />
              }
            />
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
              path="/meals/:id"
              render={ (props) => <RecipePage { ...props } /> }
            />
            <Route
              exact
              path="/drinks/:id"
              render={ (props) => <RecipePage { ...props } /> }
            />
            <Route
              exact
              path="/meals/:id/in-progress"
              render={ (props) => <RecipePage { ...props } /> }
            />
            <Route
              exact
              path="/drinks/:id/in-progress"
              render={ (props) => <RecipePage { ...props } /> }
            />
            <Route path="*" render={ () => <NotFound /> } />
          </Switch>
        </SearchApiMeals>
      </SearchApiDrinks>
    </BrowserRouter>
  );
}

export default App;
