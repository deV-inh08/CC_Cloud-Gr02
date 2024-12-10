const LocalStorageEventTarget = new EventTarget();


const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem('refresh_token');
  const clearLocalStoragedEvent = new Event("clearLocalStorage");
  LocalStorageEventTarget.dispatchEvent(clearLocalStoragedEvent);
};

const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token)
};

function saveRefreshTokenToLS(token: string) {
  localStorage.setItem('refresh_token', token);
}

const getAccessTokenFromLS = (key: string = "access_token") => localStorage.getItem(key) || '';

const getRefreshTokenFromLS = (key: string = "refresh_token") => localStorage.getItem(key) || '';


export {
  getAccessTokenFromLS,
  saveAccessTokenToLS,
  clearLocalStorage,
  getRefreshTokenFromLS,
  saveRefreshTokenToLS
}