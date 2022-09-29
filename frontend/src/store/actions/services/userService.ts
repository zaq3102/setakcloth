import { request, requestAuth } from './axios';
import {
  LOGIN_CTM,
  LOGIN_CEO,
  LOGIN_CTM_KAKAO,
  LOGIN_CEO_KAKAO,
  SOCIAL_LOGIN_CTM,
  SOCIAL_LOGIN_CEO,
  LOGOUT
} from '../types/types';
import axios from 'axios';

// 회원 정보 조회
export const InfoRequest = async () => {
  try {
    const payload = await requestAuth.get('/user');
    return payload;
  } catch (err) {
    return err;
  }
};

// 고객 회원가입
export const signupRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/user/signup', dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 사업자 회원가입
export const signupCeoRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/user/ceo/signup', dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 고객 일반 로그인
export const loginRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/auth/login', dataToSubmit);
    return {
      type: LOGIN_CTM,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 고객 카카오 로그인
export const loginkakaoRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(`/auth/login/kakao?code=${dataToSubmit}`);
    return {
      type: LOGIN_CTM_KAKAO,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 사업자 로그인
export const loginCeoRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/auth/ceo/login', dataToSubmit);
    return {
      type: LOGIN_CEO,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 사업자 카카오 로그인
export const loginkakaoCeoRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(
      `/auth/ceo/login/kakao?code=${dataToSubmit}`
    );
    return {
      type: LOGIN_CEO_KAKAO,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 로그아웃
export const logoutRequest = async () => {
  try {
    await request.get('/auth/logout');
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   store.dispatch({ type: TOKEN_DELETE });
  // }
};

// 이메일 중복 체크
export const checkEmailRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(
      `/user/signup/check?email=${dataToSubmit}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 주소 변경
export const changeAddrRequest = async (dataToSubmit) => {
  try {
    const payload = await requestAuth.post(
      '/user/update/address',
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 주소 위도 경도 받기
export const getLocationxyRequest = async (dataToSubmit) => {
  try {
    const payload = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${dataToSubmit}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_REST}`
        }
      }
    );
    return payload;
  } catch (err) {
    return err;
  }
};
