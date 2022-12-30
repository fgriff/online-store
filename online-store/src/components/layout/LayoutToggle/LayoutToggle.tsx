import React, { useEffect } from 'react';
import styles from './LayoutToggle.scss';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { toggleLayout } from '../../../redux/slices/filtersSlice';
import LayoutToggleItem from '../LayoutToggleItem/LayoutToggleItem';
import { useSearchParams } from 'react-router-dom';
import { updateLayoutQueryParams } from '../../../utils/queryParams';

const LayoutToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(toggleLayout({ isGrid: true }));
  }, []);

  const isGrid = useTypedSelector((state) => state.filters.isGrid) as boolean;

  const onClickHandler = (value: string) => {
    if (value === 'list') {
      dispatch(toggleLayout({ isGrid: false }));
    } else if (value === 'grid') {
      dispatch(toggleLayout({ isGrid: true }));
    }

    updateLayoutQueryParams('layout', value, searchParams, setSearchParams);
  };

  return (
    <div className={styles.layout}>
      <LayoutToggleItem
        value={'list'}
        isChecked={!isGrid}
        onClickHandler={onClickHandler}
      >
        <ViewListIcon sx={{ fontSize: 30 }} />
      </LayoutToggleItem>
      <LayoutToggleItem
        value={'grid'}
        isChecked={isGrid}
        onClickHandler={onClickHandler}
      >
        <ViewModuleIcon sx={{ fontSize: 30 }} />
      </LayoutToggleItem>
    </div>
  );
};

export default LayoutToggle;
