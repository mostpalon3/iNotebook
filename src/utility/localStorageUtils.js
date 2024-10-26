// localStorageUtils.js
export  const getItemAsync = (key) => {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);
      resolve(value);
    });
  };