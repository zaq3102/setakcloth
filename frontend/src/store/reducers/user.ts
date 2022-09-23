import {
  LOGIN_CTM,
  LOGIN_CEO,
  SOCIAL_LOGIN_CTM,
  SOCIAL_LOGIN_CEO,
  LOGOUT
} from '../actions/types/types';

export const initState = {
  token: '', // accessToken
  snsType: '', // 소셜 로그인 여부 (1: True, 0: False)
  loginType: '' // 1: 고객, 0: 사업자
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_CTM:
      return {
        token: action.payload.data.accessToken,
        snsType: 0,
        loginType: 0
      };
    case LOGIN_CEO:
      return {
        token: action.payload.data.accessToken,
        snsType: 0,
        loginType: 1
      };
    case SOCIAL_LOGIN_CTM:
      return {
        token: action.payload.data.accessToken,
        snsType: 1,
        loginType: 0
      };
    case SOCIAL_LOGIN_CEO:
      return {
        token: action.payload.data.accessToken,
        snsType: 1,
        loginType: 1
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
};
