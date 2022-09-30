import * as React from 'react';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginkakaoRequest } from '../../store/actions/services/userService';

const Kakao: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;
  const code = location.search.substr(6);
  const kakaoUserLogin = async () => {
    const result = await loginkakaoRequest(code);
    if (result?.payload?.data?.message === 'Success') {
      console.log(result);
      dispatch(result);
      navigate('/customer');
    } else {
      alert('로그인에 실패하였습니다!');
    }
  };
  switch (path) {
    case '/kakao/userlogin':
      kakaoUserLogin();
      break;

    case '/kakao/ceologin':
      return (
        <div>
          <h1>카카오 사장님 로그인</h1>
        </div>
      );
      break;

    case '/kakao/usersignup':
      return (
        <div>
          <h1>카카오 고객 회원 가입</h1>
        </div>
      );
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
