import React from 'react';
import { useHistory } from 'react-router-dom';
import style from '../css/Footer.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className={ style.footer }
    >

      <button
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="button search recipes drink"
        />
      </button>
      <button
        onClick={ () => history.push('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="button search recipes meal"
        />
      </button>

    </footer>
  );
}

export default Footer;
