import React from 'react';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';

export default function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" />
      <Categories />
      <Footer />
    </div>
  );
}
