export const setToLocalStorage = (key: string, data: string) => {
  window.localStorage.setItem(key, data);
};

export const getFromLocalStorage = (key : string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
};

export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

export const clearStorage = () => {
  window.localStorage.clear();
};
