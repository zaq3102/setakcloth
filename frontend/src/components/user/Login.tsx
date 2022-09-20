import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [mode, setMode] = useState('customer');

  return (
    <div className="login">
      로그인 페이지 입니다.
      <div className="login-type">
        <button type="button" onClick={() => setMode('customer')}>
          고객 로그인
        </button>
        <button type="button" onClick={() => setMode('ceo')}>
          사업자 로그인
        </button>
      </div>
      <TextField
        margin="normal"
        required
        id="id"
        label="아이디를 입력하세요."
        name="id"
        autoFocus
      />
      <br />
      <TextField
        margin="normal"
        required
        id="password"
        label="비밀번호를 입력하세요."
        name="password"
        type="password"
      />
      <br />
      <Button variant="contained" color="color2">
        로그인
      </Button>
      <br />
      <Link to="/">비밀번호 찾기</Link>
      <br />
      <br />
      <Link to="../signup">회원가입하기</Link>
    </div>
  );
};

export default Login;
