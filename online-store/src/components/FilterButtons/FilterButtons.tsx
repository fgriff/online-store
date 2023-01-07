import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedDispatch } from '../../redux/hooks';
import { resetFilters } from '../../redux/slices/filtersSlice';
import styles from './FilterButtons.scss';

const FilterButtons = () => {
  const [copyLink, setCopyLink] = useState({
    text: 'Copy link',
    backgroundColor: '#35363a',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  const onResetClickHandler = () => {
    const keys = [...searchParams.keys()];

    for (const key of keys) {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
    dispatch(resetFilters());
  };

  const onCopyClickHandler = async () => {
    const link = window.location.href;
    await navigator.clipboard.writeText(link);

    setCopyLink({
      text: 'Link copied',
      backgroundColor: '#84a8ec',
    });

    setTimeout(() => {
      setCopyLink({
        text: 'Copy link',
        backgroundColor: '#35363a',
      });
    }, 1000);
  };

  return (
    <div className={styles.filterButtons}>
      <button
        className={styles.filterButton}
        onClick={() => onResetClickHandler()}
      >
        Reset filters
      </button>
      <button
        style={{ backgroundColor: copyLink.backgroundColor }}
        className={styles.filterButton}
        onClick={() => onCopyClickHandler()}
      >
        {copyLink.text}
      </button>
    </div>
  );
};

export default FilterButtons;
