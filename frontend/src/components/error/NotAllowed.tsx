import React from 'react';
import { useNavigate } from 'react-router';

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div className="error-content">
      <h1>잘못된 접근입니다.</h1>
      <h1>로그인 후 서비스를 이용해주세요.</h1>
      <button type="button" onClick={() => navigate('/login')}>
        로그인하기
      </button>
    </div>
  );
};

export default NotAllowed;
