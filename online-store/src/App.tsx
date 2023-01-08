import React from 'react';
import BasketPage from './pages/BasketPage/BasketPage';
import GoodsPage from './pages/GoodsPage/GoodsPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import styles from './App.scss';
import { Route, Routes } from 'react-router-dom';

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
            path="/cart"
            element={<BasketPage />}
          />
          <Route
            path={'*'}
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
