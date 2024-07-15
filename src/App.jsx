import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OnlineDelivery from './components/OnlineDelivery';
import Recipe from './components/Recipe';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <OnlineDelivery />
          </>
        } />
        <Route path="/recipe/:idMeal" element={<Recipe />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
