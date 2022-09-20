import { Checkbox, FormControl, Input, InputLabel } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.scss';

const Signup: React.FC = () => {
  const [mode, setMode] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tosCheck, setTosCheck] = useState(false);
  const [page, setPage] = useState(1);

  const emailChange = (event) => {
    // const regEmail =
    //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // const isEmailValid = regEmail.test(event.target.value.trim());
    setEmail(event.target.value.trim());
  };

  const passwordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const passwordCheckChange = (event) => {
    setPasswordCheck(event.target.value.trim());
  };

  const onClickTOS = () => {
    if (tosCheck) {
      setTosCheck(false);
    } else {
      setTosCheck(true);
    }
  };

  const onClickChange = () => {
    setPage(2);
  };

  return (
    <div>
      <h2>회원가입 페이지 입니다.</h2>
      {page === 1 ? (
        <div>
          <div className="signup-type">
            <button type="button" onClick={() => setMode('customer')}>
              고객 회원가입
            </button>
            <button type="button" onClick={() => setMode('ceo')}>
              사업자 회원가입
            </button>
          </div>
          <FormControl sx={{ width: 315 }}>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <Input value={email} onChange={emailChange} />
          </FormControl>
          <br />
          <FormControl sx={{ width: 315 }}>
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <Input type="password" value={password} onChange={passwordChange} />
          </FormControl>
          <br />
          <FormControl sx={{ width: 315 }}>
            <InputLabel htmlFor="passwordcheck">비밀번호 확인</InputLabel>
            <Input
              type="password"
              value={passwordCheck}
              onChange={passwordCheckChange}
            />
          </FormControl>
          <br />
          <Checkbox onClick={onClickTOS} />
          <Link to="../TOS">세탁클로쓰의 이용약관</Link>에 동의합니다.
          <Link to="/">취소</Link>
          <button type="button" onClick={onClickChange}>
            다음
          </button>
        </div>
      ) : (
        <div>두 번째 페이지</div>
      )}
    </div>
  );
};

export default Signup;
