import { Box, Button, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="login">
      로그인 페이지 입니다.
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          id="id"
          label="아이디를 입력하세요."
          name="id"
          autoFocus
        />
        <br/>
        <TextField
          margin="normal"
          required
          id="password"
          label="비밀번호를 입력하세요."
          name="password"
          type="password"
        />
        <br/>
        <Button
          variant="contained">
          로그인
        </Button>
        <br/>
        <Link to="#">비밀번호 찾기</Link>
        <br />
        <br />
        <Link to="../signup">회원가입하기</Link>
      </Box>
    </div>
  );
};

export default Login;
