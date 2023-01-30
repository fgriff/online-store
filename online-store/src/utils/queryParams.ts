export const updateCheckboxQueryParams = (
  key: string,
  value: string,
  searchCallback: URLSearchParams,
  setSearchCallback: (value: URLSearchParams) => void,
) => {
  if (searchCallback.has(key)) {
    const valuesArr = searchCallback.get(key)?.split('|');

    if (valuesArr?.includes(value)) {
      const valueIndex = valuesArr.indexOf(value);
      valuesArr.splice(valueIndex, 1);

      if (!valuesArr.length) {
        searchCallback.delete(key);
        setSearchCallback(searchCallback);
        return;
      }

      searchCallback.set(key, valuesArr.join('|'));
    } else {
      const updatedValues = `${searchCallback.get(key)}|${value}`;
      searchCallback.set(key, updatedValues);
    }
  } else {
    searchCallback.set(key, value);
  }

  setSearchCallback(searchCallback);
};

export const updateSliderQueryParams = (
  key: string,
  min: number,
  max: number,
  searchCallback: URLSearchParams,
  setSearchCallback: (value: URLSearchParams) => void,
) => {
  if (searchCallback.has(key)) {
    const valuesArr = searchCallback.get(key)?.split('|');

    if (valuesArr) {
      valuesArr[0] = String(min);
      valuesArr[1] = String(max);
      searchCallback.set(key, valuesArr.join('|'));
    }
  } else {
    searchCallback.set(key, `${min}|${max}`);
  }

  setSearchCallback(searchCallback);
};

export const updateSortQueryParams = (
  key: string,
  value: string,
  searchCallback: URLSearchParams,
  setSearchCallback: (value: URLSearchParams) => void,
) => {
  searchCallback.set(key, value);
  setSearchCallback(searchCallback);
};

export const updateSearchQueryParams = (
  key: string,
  value: string,
  searchCallback: URLSearchParams,
  setSearchCallback: (value: URLSearchParams) => void,
) => {
  if (value) {
    searchCallback.set(key, value);
  } else {
    searchCallback.delete(key);
  }

  setSearchCallback(searchCallback);
};

export const updateLayoutQueryParams = (
  key: string,
  value: string,
  searchCallback: URLSearchParams,
  setSearchCallback: (value: URLSearchParams) => void,
) => {
  if (value) {
    searchCallback.set(key, value);
  } else {
    searchCallback.delete(key);
  }

  setSearchCallback(searchCallback);
};
