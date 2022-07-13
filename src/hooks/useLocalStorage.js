/* eslint-disable default-case */
export default function useLocalStorage() {
  const storage = localStorage;

  function setStorage(action, key, data) {
    switch (action) {
      case "add":
        storage.setItem(key, data);
        break;
      case "delete":
        storage.removeItem(key);
        break;
      case "get":
        storage.getItem(key);
        break;
      case "clear":
        storage.clear();
    }
  }

  return [storage, setStorage];
}
