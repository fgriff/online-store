import {
  setDualSlider,
  setSearchField,
  setSortType,
  toggleCheckbox,
  toggleLayout,
} from '../redux/slices/filtersSlice';
import { Dispatch } from '../redux/store';

export const parseQueryString = (
  key: string,
  searchCallback: URLSearchParams,
  dispatch: Dispatch,
) => {
  if (searchCallback.has(key)) {
    const values = searchCallback.get(key);
    const valuesArr = values?.split('|');

    switch (key) {
      case 'brand':
      case 'category':
        valuesArr?.forEach((value) => {
          dispatch(toggleCheckbox({ title: key, value, isChecked: false }));
        });
        break;

      case 'price':
      case 'stock':
        {
          const NumberValuesArr = valuesArr?.map((value) => Number(value));

          if (NumberValuesArr && NumberValuesArr.length) {
            dispatch(
              setDualSlider({
                title: key,
                minValue: NumberValuesArr[0],
                maxValue: NumberValuesArr[1],
                init: true,
              }),
            );
          }
        }
        break;

      case 'sort':
        if (values) {
          dispatch(setSortType({ sort: values }));
        }
        break;

      case 'search':
        if (values) {
          dispatch(setSearchField({ search: values }));
        }
        break;

      case 'layout':
        if (values) {
          dispatch(toggleLayout({ layout: values }));
        }
        break;
    }
  }
};
