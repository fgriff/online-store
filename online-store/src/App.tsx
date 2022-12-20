import React from 'react';
import styles from './App.module.scss';
import classnames from 'classnames';

const App = () => {
  return <h1 className={classnames(styles.app)}>Hello world</h1>;
};

export default App;
