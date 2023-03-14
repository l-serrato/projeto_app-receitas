import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Profile() {
  const localEmail = localStorage.getItem('user');
  const objEmail = localEmail ? JSON.parse(localEmail) : '';
  const { email } = objEmail;
  const history = useHistory();

  const logoutSubmit = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageTitle="Profile" />
      <h1 data-testid="profile-email">{ email }</h1>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ logoutSubmit }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
