import React, { FC, useState } from 'react';
import styles from './DualFilter.scss';
import { IDualFilterData } from '../../../types/goods';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EuroIcon from '@mui/icons-material/Euro';

const DualFilter: FC<IDualFilterData> = (props) => {
  const { title, min, max, sign } = props;

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

  const [value, setValue] = useState<number[]>([min, max]);
  const [rangeMin, rangeMax] = value;
  const minDistance = 0;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], rangeMax - minDistance), rangeMax]);
    } else {
      setValue([rangeMin, Math.max(newValue[1], rangeMin + minDistance)]);
    }
  };

  return (
    <div className={styles.dualFilter}>
      <h3 className={styles.dualFilter__title}>{title}</h3>
      <div className={styles.dualFilter__wrapper}>
        <div className={styles.dualFilter__range}>
          <span className={styles.dualFilter__minRange}>
            {sign && <EuroIcon />}
            {rangeMin}
          </span>
          <span className={styles.dualFilter__maxRange}>
            {sign && <EuroIcon />}
            {rangeMax}
          </span>
        </div>
        <ThemeProvider theme={theme}>
          <Slider
            min={min}
            max={max}
            value={value}
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
