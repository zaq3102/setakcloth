import axios from 'axios';
import store from '../../..';

/**
 * 인증 필요없는 Axios
 */
export const request = axios.create({
  baseURL: 'https://j7a706.p.ssafy.io:8080/',
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
  baseURL: 'https://j7a706.p.ssafy.io:8080/',
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

    // 로그아웃

    // 로직 구현하기

    // .catch() 로 이어진다.
    return Promise.reject(error);
  }
);
