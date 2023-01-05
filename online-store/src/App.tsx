import React from 'react';
import BasketPage from './pages/BasketPage/BasketPage';
import GoodsPage from './pages/GoodsPage/GoodsPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import styles from './App.scss';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={<GoodsPage />}
          />
          <Route
            path="/product-details/:id"
            element={<ProductPage />}
          />
          <Route
            path="/cart"
            element={<BasketPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
