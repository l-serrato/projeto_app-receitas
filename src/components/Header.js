import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import SearchApiDrinks from '../context/SearchApiDrinks';
import SearchApiMeals from '../context/SearchApiMeals';

function Header({ pageTitle }) {
  // O page title recebido deve ser igual aos casos dos IF
  const [showSearchBar, setShowSearchBar] = useState();

  function changeSearchBarState() {
    setShowSearchBar(!showSearchBar);
  }

  if (pageTitle === 'Meals' || pageTitle === 'Drinks') {
    return (
      <header>
        <h2 data-testid="page-title">{ pageTitle }</h2>

        <Link to="/profile">
          <img src={ profileIcon } alt="Ícone de perfil" data-testid="profile-top-btn" />
        </Link>

        <button
          type="button"
          onClick={ changeSearchBarState }
        >
          <img src={ searchIcon } alt="Ícone de Busca" data-testid="search-top-btn" />
        </button>
        { showSearchBar
          ? (
            <SearchApiDrinks>
              <SearchApiMeals>
                <SearchBar />
              </SearchApiMeals>
            </SearchApiDrinks>
          )
          : null }
      </header>
    );
  }
  if (
    pageTitle === 'Profile'
    || pageTitle === 'Favorite Recipes'
    || pageTitle === 'Done Recipes') {
    return (
      <header>
        <h2 data-testid="page-title">{ pageTitle }</h2>

        <Link to="/profile">
          <img src={ profileIcon } alt="Ícone de perfil" data-testid="profile-top-btn" />
        </Link>
      </header>
    );
  }
  return null;
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
