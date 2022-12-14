import * as React from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginkakaoRequest,
  loginkakaoCeoRequest,
  getCtmKakaoEmail,
  getCeoKakaoEmail
} from '../../store/actions/services/userService';
import { myLaundryRequest } from '../../store/actions/services/laundryService';
import Swal from 'sweetalert2';

const Kakao: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useParams();
  const code = location.search.substr(6);

  const kakaoUserLogin = async () => {
    const result = await loginkakaoRequest(code);
    if (result?.payload?.data?.message === 'Success') {
      dispatch(result);
      const result2 = await myLaundryRequest();
      if (result2?.payload?.data?.laundries) {
        dispatch(result2);
      } else {
        navigate('/error');
      }
      navigate('/customer');
    } else {
      const status = result?.response?.data?.statusCode;
      switch (status) {
        case 403:
          Swal.fire({
            width: 400,
            icon: 'error',
            html: '탈퇴한 회원입니다. <br/>다시 가입해주세요!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/signup');
          break;

        case 409:
          Swal.fire({
            width: 400,
            icon: 'error',
            text: '회원가입을 먼저 해주세요!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/login');
          break;

        default:
          Swal.fire({
            width: 200,
            icon: 'error',
            text: '로그인에 실패하였습니다!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/login');
          break;
      }
    }
  };

  const kakaoCeoLogin = async () => {
    const result = await loginkakaoCeoRequest(code);
    if (result?.payload?.data?.message === 'Success') {
      dispatch(result);
      const result2 = await myLaundryRequest();
      if (result2?.payload?.data?.laundries) {
        dispatch(result2);
      } else {
        navigate('/error');
      }
      navigate('/ceo');
    } else {
      const status = result?.response?.data?.statusCode;
      switch (status) {
        case 403:
          Swal.fire({
            width: 200,
            icon: 'error',
            html: '탈퇴한 회원입니다. <br/>다시 가입해주세요!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/signup');
          break;

        case 409:
          Swal.fire({
            width: 200,
            icon: 'error',
            text: '회원가입을 먼저 해주세요!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/login');
          break;

        default:
          Swal.fire({
            width: 200,
            icon: 'error',
            text: '로그인에 실패하였습니다!',
            confirmButtonColor: '#1e3e5c'
          });
          navigate('/login');
          break;
      }
    }
  };

  const kakaoGetEmail = async (type) => {
    let result = '';
    if (type === 'customer') {
      result = await getCtmKakaoEmail(code);
    } else if (type === 'ceo') {
      result = await getCeoKakaoEmail(code);
    }
    if (result?.data?.statusCode === 200) {
      navigate('/signup', {
        state: { url: data, kakaoemail: result?.data?.kakaoEmail }
      });
    } else if (result?.response?.status === 409) {
      Swal.fire({
        width: 200,
        icon: 'error',
        html: '이미 가입한 회원입니다. <br/>로그인 해주세요!',
        confirmButtonColor: '#1e3e5c'
      });
      navigate('/login');
    }
  };

  switch (data) {
    case 'userlogin':
      kakaoUserLogin();
      break;

    case 'ceologin':
      kakaoCeoLogin();
      break;

    case 'usersignup':
      kakaoGetEmail('customer');
      break;

    case 'ceosignup':
      kakaoGetEmail('ceo');
      break;

    default:
      break;
  }
};

export default Kakao;
