import { useEffect, useState } from 'react';

export default function SearchApiDrinks() {
  const [endpoint, setEndpoint] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [result, setResult] = useState();

  useEffect(() => {
    if (endpoint !== '') {
      const fetchData = async () => {
        try {
          const data = await fetch(endpoint);
          const json = await data.json();
          return setResult(json);
        } catch (error) {
          setResult(error);
        }
      };
      fetchData();
    }
  }, [endpoint]);

  const ingredientes = (prop) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${prop}`;
  const nome = (prop) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${prop}`;
  const primeiraLetra = (prop) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${prop}`;

  const onClick = ({ target: { value } }) => {
    if (value === 'Ingredient') { setEndpoint(ingredientes(pesquisa)); }
    if (value === 'Name') { setEndpoint(nome(pesquisa)); }
    if (value === 'First letter') {
      return pesquisa.length <= 1
        ? setEndpoint(primeiraLetra(pesquisa))
        : global.alert('Your search must have only 1 (one) character');
    }
  };

  const onChange = ({ target: { value } }) => setPesquisa(value);

  return (
    <div>
      <form>
        <div>
          <input type="text" value={ pesquisa } onChange={ onChange } />
        </div>
        <div>
          <input type="radio" value="Ingredient" onClick={ onClick } />
          Ingedientes
          <input type="radio" value="Name" onClick={ onClick } />
          Nome
          <input type="radio" value="First letter" onClick={ onClick } />
          Primeira Letra
        </div>
      </form>
      {result ? <p>temos resultados</p> : <p>não temos resiltados</p>}
    </div>
  );
}
