import * as React from 'react';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginkakaoRequest,
  loginkakaoCeoRequest,
  getCtmKakaoEmail
} from '../../store/actions/services/userService';

const Kakao: React.FC = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;
  const code = location.search.substr(6);

  const kakaoUserLogin = async () => {
    const result = await loginkakaoRequest(code);
    if (result?.payload?.data?.message === 'Success') {
      dispatch(result);
      navigate('/customer');
    } else {
      const status = result?.response?.data?.statusCode;
      switch (status) {
        case 403:
          alert('탈퇴한 회원입니다. 다시 가입해주세요!');
          navigate('/signup');
          break;

        case 409:
          alert('회원가입을 먼저 해주세요!');
          navigate('/login');
          break;

        default:
          alert('로그인에 실패하였습니다!');
          navigate('/login');
          break;
      }
    }
  };

  const kakaoCeoLogin = async () => {
    const result = await loginkakaoCeoRequest(code);
    if (result?.payload?.data?.message === 'Success') {
      dispatch(result);
      navigate('/ceo');
    } else {
      const status = result?.response?.data?.statusCode;
      switch (status) {
        case 403:
          alert('탈퇴한 회원입니다. 다시 가입해주세요!');
          navigate('/signup');
          break;

        case 409:
          alert('회원가입을 먼저 해주세요!');
          navigate('/login');
          break;

        default:
          alert('로그인에 실패하였습니다!');
          navigate('/login');
          break;
      }
    }
  };

  const kakaoUserGetEmail = async (e) => {
    console.log('hi');

    const result = await getCtmKakaoEmail(code);
    console.log(result);

    if (result?.data?.statusCode === 200) {
      setEmail(result?.data.kakaoEmail);
      e.preventDefault();
    } else if (result?.response?.status === 409) {
      alert('이미 가입한 회원입니다. 로그인을 해주세요!');
      navigate('/login');
    }
  };

  switch (path) {
    case '/kakao/userlogin':
      kakaoUserLogin();
      break;

    case '/kakao/ceologin':
      kakaoCeoLogin();
      break;

    case '/kakao/usersignup':
      kakaoUserGetEmail();
      if (email) {
        console.log(email);
        navigate('/signup');
      }
      break;

    case '/kakao/ceosignup':
      return (
        <div>
          <h1>카카오 사장님 회원 가입</h1>
        </div>
      );
      break;

    default:
      break;
  }
};

export default Kakao;
