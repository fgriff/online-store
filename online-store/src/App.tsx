import React from 'react';
import GoodsPage from './pages/GoodsPage/GoodsPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
