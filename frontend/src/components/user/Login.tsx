import { Box, Button, Grid, Link, TextField } from '@mui/material';
import * as React from 'react';

const Login: React.FC = () => {
  return (
    <div className="login">
      로그인 페이지 입니다.
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="id"
          label="아이디를 입력하세요."
          name="id"
          autoComplete="id"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호를 입력하세요."
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          로그인
        </Button>

        <Link href="#">비밀번호 찾기</Link>
        <br />
        <br />
        <Link href="#">회원가입하기</Link>
      </Box>
    </div>
  );
};

export default Login;
