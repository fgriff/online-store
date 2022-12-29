import React, { FC, useEffect } from 'react';
import styles from './DualFilter.scss';
import { IDualFilterData } from '../../../types/goods';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTypedDispatch, useTypedSelector } from '../../../redux/hooks';
import { setDualSlider } from '../../../redux/slices/filtersSlice';

const DualFilter: FC<IDualFilterData> = (props) => {
  const { title, min, max, children } = props;

  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            color: '#84a8ec',
          },
          thumb: {
            width: '15px',
            height: '15px',
          },
        },
      },
    },
  });

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(setDualSlider({ title, minValue: min, maxValue: max }));
  }, []);

  const values = useTypedSelector(
    (state) => state.filters[title.toLowerCase()] as number[],
  );

  const [rangeMin, rangeMax] = values;
  const minDistance = 0;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let minValue: number;
    let maxValue: number;

    if (activeThumb === 0) {
      minValue = Math.min(newValue[0], rangeMax - minDistance);
      maxValue = rangeMax;
      dispatch(setDualSlider({ title, minValue, maxValue }));
    } else {
      minValue = rangeMin;
      maxValue = Math.max(newValue[1], rangeMin + minDistance);
      dispatch(setDualSlider({ title, minValue, maxValue }));
    }
  };

  return (
    <div className={styles.dualFilter}>
      <h3 className={styles.dualFilter__title}>{title}</h3>
      <div className={styles.dualFilter__wrapper}>
        <div className={styles.dualFilter__range}>
          <span className={styles.dualFilter__minRange}>
            {children}
            {rangeMin}
          </span>
          <span className={styles.dualFilter__maxRange}>
            {children}
            {rangeMax}
          </span>
        </div>
        <ThemeProvider theme={theme}>
          <Slider
            min={min}
            max={max}
            value={values}
            onChange={handleChange}
            valueLabelDisplay="off"
            disableSwap
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default DualFilter;
