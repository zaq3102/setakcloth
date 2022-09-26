import { Button, FormHelperText, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginCeoRequest,
  loginRequest
} from '../../store/actions/services/userService';

const Login: React.FC = () => {
  const [mode, setMode] = useState('customer');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // 유효성 확인 결과 변수
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailChange = (event) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const valid = regEmail.test(event.target.value.trim());

    setEmail(event.target.value.trim());
    setIsEmailValid(valid);
  };

  const passwordChange = (event) => {
    setPwd(event.target.value.trim());
  };

  const handleSubmit = async () => {
    const loginInfo = {
      email,
      pwd
    };

    let result = '';
    if (mode === 'customer') {
      result = await loginRequest(loginInfo);
    } else if (mode === 'ceo') {
      result = await loginCeoRequest(loginInfo);
    }

    if (result?.payload?.data?.message === 'Success') {
      dispatch(result);
      if (mode === 'customer') {
        navigate('/customer');
      } else if (mode === 'ceo') {
        navigate('/ceo');
      }
    } else {
      alert('로그인에 실패하였습니다!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-type">
        <button
          type="button"
          onClick={() => setMode('customer')}
          className={`${
            mode === 'customer' ? 'mode-selected' : 'mode-not-selected'
          }`}>
          고객 로그인
        </button>
        <button
          type="button"
          onClick={() => setMode('ceo')}
          className={`${
            mode === 'ceo' ? 'mode-selected' : 'mode-not-selected'
          }`}>
          사업자 로그인
        </button>
      </div>
      <TextField
        margin="normal"
        required
        id="email"
        label="이메일을 입력하세요."
        value={email}
        onChange={emailChange}
        autoFocus
        sx={{ width: 300 }}
      />
      <FormHelperText error={!!email && !isEmailValid}>
        {email ? (isEmailValid ? '' : '유효하지 않은 이메일 형식입니다.') : ''}
      </FormHelperText>
      <TextField
        margin="normal"
        required
        id="password"
        label="비밀번호를 입력하세요."
        type="password"
        value={pwd}
        onChange={passwordChange}
        sx={{ width: 300 }}
      />
      <br />
      <Button variant="contained" color="color2" onClick={handleSubmit}>
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
