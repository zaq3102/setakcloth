import { Box, Button, FormHelperText, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { myLaundryRequest } from '../../store/actions/services/laundryService';
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

  const tabContArr = [{ title: '고객 로그인' }, { title: '사장님 로그인' }];

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
        const result2 = await myLaundryRequest();
        if (result2?.payload?.data?.laundries) {
          dispatch(result2);
        } else {
          navigate('/error');
        }
        navigate('/ceo');
      }
    } else {
      Swal.fire({
        width: 200,
        icon: 'error',
        text: '로그인에 실패하였습니다!'
      });
    }
  };

  const kakaoUserLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_REST}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakao/userlogin`;
  };

  const kakaoCeoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_REST}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakao/ceologin`;
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
    if (index === 0) {
      setMode('customer');
    } else {
      setMode('ceo');
    }
    setEmail('');
    setPwd('');
  };

  return (
    <div className="login-page">
      <div className="login-type">
        {tabContArr.map(({ title }, idx) => (
          <Button
            variant="contained"
            key={`tab-${idx}`}
            onClick={() => tabClickHandler(idx)}
            color={`${activeIndex === idx ? 'color1' : 'color4'}`}
            disableElevation
            className={`${
              activeIndex === idx ? 'mode-selected' : 'mode-not-selected'
            }`}
            sx={{
              borderTopLeftRadius: '7px',
              borderTopRightRadius: '7px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px'
            }}>
            {title}
          </Button>
        ))}
      </div>
      <Box
        component="span"
        sx={{
          width: '300px',
          p: 2,
          border: '1px solid #1e3e5c',
          borderBottomLeftRadius: '7px',
          borderBottomRightRadius: '7px'
        }}>
        <div className="signup-page">
          <TextField
            margin="normal"
            required
            id="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={emailChange}
            autoFocus
            sx={{ width: '90%' }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <FormHelperText error={!!email && !isEmailValid}>
            {email
              ? isEmailValid
                ? ''
                : '유효하지 않은 이메일 형식입니다.'
              : ''}
          </FormHelperText>
          <TextField
            margin="normal"
            required
            id="password"
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={pwd}
            onChange={passwordChange}
            sx={{ width: '90%' }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <br />
          <div>
            <div>
              <Button
                sx={{ padding: 0.3, mt: 1, md: 1, width: '120px' }}
                variant="outlined"
                className="next-btn"
                onClick={handleSubmit}
                color="color1">
                <b>로그인</b>
              </Button>
            </div>

            <div>
              <Button
                sx={{ padding: 0, m: 1 }}
                onClick={
                  activeIndex === 0
                    ? kakaoUserLoginHandler
                    : kakaoCeoLoginHandler
                }>
                <img
                  style={{ padding: 0, width: '120px' }}
                  alt="카카오 회원 가입"
                  src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/kakao_login.png"
                />
              </Button>
            </div>
          </div>

          <Box sx={{ m: 2 }}>
            <div className="rowspan">
              <Link to="/">비밀번호 찾기</Link> &nbsp; / &nbsp;
              <Link to="../signup">회원가입하기</Link>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Login;
