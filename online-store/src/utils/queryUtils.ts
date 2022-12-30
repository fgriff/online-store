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
