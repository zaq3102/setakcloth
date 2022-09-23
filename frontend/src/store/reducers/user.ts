import { LOGIN, SOCIAL_LOGIN, LOGOUT } from '../actions/types/types';

export const initState = {
  token: '', // accessToken
  snsType: '', // 소셜 로그인 여부 (1: True, 0: False)
  loginType: '' // 1: 고객, 0: 사업자
};

export default (action, state = initState) => {
  switch (action) {
    case LOGIN:
      return {
        ...state,
        // token: action.payload.data.result.accessToken,
        snsType: 0
      };
    case SOCIAL_LOGIN:
      return {
        ...state,
        // token: action.payload.data.result.accessToken,
        snsType: 1
      };
    case LOGOUT:
      return initState;
    // return {
    //   ...state,
    //   token: '',
    //   snsType: '',
    //   loginType: ''
    // };
    default:
      return state;
  }
};
