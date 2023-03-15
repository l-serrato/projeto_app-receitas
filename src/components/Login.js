import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../css/Login.module.css';
import logo from '../images/logo.svg';
import tomate from '../images/tomate.png';

function Login() {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  useEffect(() => {
    const { email, password } = state;
    const number = 6;
    let isDisab = true;
    if (password.length > number && validEmail(email)) isDisab = false;
    setIsDisabled(isDisab);
  }, [state]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const buttonClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
    history.push('/meals');
  };

  return (
    <div className={ styles.mainContainer }>
      <img src={ logo } alt="Ícone de prato" className={ styles.logo } />

      <img src={ tomate } alt="Imagem de tomate" className={ styles.tomate } />

      <div className={ styles.inputContainer }>
        <h2 className={ styles.title }>LOGIN</h2>
        <input
          data-testid="email-input"
          value={ state.email }
          onChange={ handleChange }
          name="email"
          placeholder="Email"
          className={ styles.inputs }
        />

        <input
          data-testid="password-input"
          type="password"
          value={ state.password }
          onChange={ handleChange }
          name="password"
          placeholder="Password"
          className={ styles.inputs }
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ buttonClick }
          className={ styles.buttonSubmit }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
