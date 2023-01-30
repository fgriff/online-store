import React, { useEffect } from 'react';
import styles from './LayoutToggle.scss';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { toggleLayout } from '../../../redux/slices/filtersSlice';
import LayoutToggleItem from '../LayoutToggleItem/LayoutToggleItem';
import { useSearchParams } from 'react-router-dom';
import { updateLayoutQueryParams } from '../../../utils/queryParams';
import { parseQueryString } from '../../../utils/queryParser';

const LayoutToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(toggleLayout({ layout: 'grid' }));
    parseQueryString('layout', searchParams, dispatch);
  }, []);

  const layout = useTypedSelector(({ filters }) => filters.filterValues.layout);

  const onClickHandler = (value: string) => {
    if (value === 'list') {
      dispatch(toggleLayout({ layout: 'list' }));
    } else if (value === 'grid') {
      dispatch(toggleLayout({ layout: 'grid' }));
    }

    updateLayoutQueryParams('layout', value, searchParams, setSearchParams);
  };

  return (
    <div className={styles.layout}>
      <LayoutToggleItem
        value={'list'}
        isChecked={layout === 'list' ? true : false}
        onClickHandler={onClickHandler}
      >
        <ViewListIcon sx={{ fontSize: 30 }} />
      </LayoutToggleItem>
      <LayoutToggleItem
        value={'grid'}
        isChecked={layout === 'grid' ? true : false}
        onClickHandler={onClickHandler}
      >
        <ViewModuleIcon sx={{ fontSize: 30 }} />
      </LayoutToggleItem>
    </div>
  );
};

export default LayoutToggle;
