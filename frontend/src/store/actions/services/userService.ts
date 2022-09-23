import { request, requestAuth } from './axios';
import {
  LOGIN_CTM,
  LOGIN_CEO,
  SOCIAL_LOGIN_CTM,
  SOCIAL_LOGIN_CEO,
  LOGOUT
} from '../types/types';

// 고객 회원 정보 조회
export const ctmInfoRequest = async () => {
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

// 고객 로그인
export const loginRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/auth/login', dataToSubmit);
    console.log(payload);
    return {
      type: LOGIN_CTM,
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
      `/user/signup/check/?email=${dataToSubmit}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};
