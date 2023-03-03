import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

export default function Meals() {
  const [input, setInput] = useState('');
  const history = useHistory();

  function handleClick() {
    history.push(`/meals/${input}`);
  }

  return (
    <div>
      <Header pageTitle="Meals" />
      <input
        type="text"
        placeholder="insira um nome"
        onChange={ (e) => setInput(e.target.value) }
      />
      <button type="button" onClick={ handleClick }>
        Ir para receita
      </button>

    </div>
  );
}
