import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <input
        type="radio"
        name="ingredient"
        id=""
        data-testid="ingredient-search-radio"
      />
      ingredient
      <input
        type="radio"
        name="name"
        id=""
        data-testid="name-search-radio"
      />
      name
      <input
        type="radio"
        name="first letter"
        id=""
        data-testid="first-letter-search-radio"
      />
      First letter
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
