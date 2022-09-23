import { request, requestAuth } from './axios';
import { LOGIN, SOCIAL_LOGIN, LOGOUT } from '../types/types';

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

// 로그인
export const loginRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post('/auth/login', dataToSubmit);
    return {
      type: LOGIN,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 로그아웃
export const logoutRequest = async () => {
  try {
    const payload = await request.get('/auth/logout');
    return {
      type: LOGOUT,
      payload
    };
  } catch (err) {
    return err;
  }
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
