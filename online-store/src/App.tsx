import React, { useEffect } from 'react';
import BasketPage from './pages/BasketPage/BasketPage';
import GoodsPage from './pages/GoodsPage/GoodsPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import styles from './App.scss';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import localStorage, { filterData, modifiedData } from './utils/localStorage';
import { useTypedDispatch } from './redux/hooks';
import { setInitialData } from './redux/slices/basketSlice';
import database from './assets/mocks/storage-mock';

const App = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (localStorage.isNotEmpty()) {
      const savedData = localStorage.products;

      const filteredProducts = filterData(database, savedData);
      const modifiedProducts = modifiedData(filteredProducts, savedData);

      dispatch(setInitialData({ products: modifiedProducts }));
    }
  }, []);

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
