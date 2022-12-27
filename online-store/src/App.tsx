import React from 'react';
import BasketPage from './pages/BasketPage/BasketPage';
import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <BasketPage />
      </main>
    </div>
  );
};

export default App;
