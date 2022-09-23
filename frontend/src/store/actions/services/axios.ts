import axios from 'axios';
import store from 'src';

/**
 * 인증 필요없는 Axios
 */
export const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

request.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

/**
 * 인증 필요한 Axios
 */
export const requestAuth = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

requestAuth.interceptors.request.use(
  (config) => {
    const { token } = store.getState().user;
    try {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (err) {
      console.error(`[axios.interceptors.request] config : ${err}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const result = error.config;
    console.log(error);

    // 로그아웃
    if (
      (result.url === '/logout' || result.url === '/ceo/logout') &&
      result.method === 'delete'
    ) {
      return Promise.reject(error);
    }

    // 로직 구현하기

    // .catch() 로 이어진다.
    return Promise.reject(error);
  }
);
