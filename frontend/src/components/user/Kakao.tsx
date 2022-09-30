import * as React from 'react';
import { useLocation } from 'react-router';

const Kakao: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  switch (path) {
    case '/kakao/userlogin':
      return (
        <div>
          <h1>카카오 고객 로그인</h1>
        </div>
      );
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
  // console.log(location.pathname);

  // if (location.pathname === '/kakao/userlogin') {
  //   return (
  //     <div>
  //       <h1>카카오 고객 로그인</h1>
  //     </div>
  //   );
  // }

  // if (location.pathname === '/kakao/ceologin') {
  //   return (
  //     <div>
  //       <h1>카카오 사장님 로그인</h1>
  //     </div>
  //   );
  // }

  // if (location.pathname === '/kakao/usersignup') {
  //   return (
  //     <div>
  //       <h1>카카오 고객 회원 가입</h1>
  //     </div>
  //   );
  // }

  // if (location.pathname === '/kakao/ceosignup') {
  //   return (
  //     <div>
  //       <h1>카카오 사장님 회원 가입</h1>
  //     </div>
  //   );
  // }
};

export default Kakao;
