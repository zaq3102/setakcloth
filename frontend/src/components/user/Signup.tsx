import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { checkEmailRequest } from '../../store/actions/services/userService';
import TOS from './TOS';

const Signup: React.FC = () => {
  const [mode, setMode] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [walletpassword, setWalletPassword] = useState('');
  const [walletpasswordCheck, setWalletPasswordCheck] = useState('');
  const [tosCheck, setTosCheck] = useState(false);
  const [page, setPage] = useState(1);

  // 유효성 확인 결과 변수
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  // 이메일 중복 체크
  const [emailChecked, setEmailChecked] = useState(999);

  const debounceFunc = debounce(async (value, request, setState) => {
    const result = await request(value);
    if (result?.data?.statusCode) {
      setState(result?.data?.statusCode);
    } else {
      alert('올바르지 않은 접근입니다.');
    }
  }, 500);

  const emailChange = (event) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const valid = regEmail.test(event.target.value.trim());

    setEmail(event.target.value.trim());
    setIsEmailValid(valid);

    if (valid) {
      debounceFunc(
        event.target.value.trim(),
        checkEmailRequest,
        setEmailChecked
      );
    }
  };

  const passwordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
    const valid = regPassword.test(event.target.value.trim());

    setPassword(event.target.value.trim());
    setIsPasswordValid(valid);

    if (event.target.value.trim() && valid) {
      setIsPasswordSame(
        event.target.value.trim() && event.target.value.trim() === passwordCheck
      );
    }
  };

  const passwordCheckChange = (event) => {
    setPasswordCheck(event.target.value.trim());
    setIsPasswordSame(password === event.target.value.trim());
  };

  const onClickTOS = () => {
    if (tosCheck) {
      setTosCheck(false);
    } else {
      setTosCheck(true);
    }
  };

  const walletpasswordChange = (event) => {
    setWalletPassword(event.target.value.trim());
  };

  const walletpasswordCheckChange = (event) => {
    setWalletPasswordCheck(event.target.value.trim());
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
          <TextField
            margin="normal"
            required
            id="email"
            label="이메일"
            value={email}
            onChange={emailChange}
            autoFocus
          />
          <FormHelperText
            error={!!email && (!isEmailValid || emailChecked !== 'Success')}>
            {email
              ? isEmailValid
                ? emailChecked
                  ? emailChecked === 200
                    ? '사용 가능한 이메일입니다.'
                    : '이메일 중복 여부를 확인중입니다.'
                  : '이미 사용중인 이메일입니다.'
                : '유효하지 않은 이메일입니다.'
              : '이메일을 입력해 주세요.'}
          </FormHelperText>
          <br />
          <TextField
            margin="normal"
            required
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={passwordChange}
          />
          <FormHelperText error={!!password && !isPasswordValid}>
            {isPasswordValid
              ? '안전한 비밀번호입니다.'
              : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'}
          </FormHelperText>
          <br />
          <TextField
            margin="normal"
            required
            id="passwordcheck"
            label="비밀번호 확인"
            type="password"
            value={passwordCheck}
            onChange={passwordCheckChange}
          />
          <FormHelperText error={!!passwordCheck && !isPasswordSame}>
            {!passwordCheck || isPasswordSame
              ? ' '
              : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
          <br />
          <FormControlLabel
            control={<Checkbox onClick={onClickTOS} />}
            label="세탁클로쓰의 이용약관에 동의합니다. (필수)"
          />
          <TOS />
          <br />
          <Link to="/">취소</Link>
          <button
            type="button"
            onClick={onClickChange}
            disabled={
              !isEmailValid ||
              emailChecked !== 200 ||
              !isPasswordValid ||
              !isPasswordSame ||
              !tosCheck
            }>
            다음
          </button>
        </div>
      ) : (
        <div>
          <h3>지갑 생성하기</h3>
          <TextField
            margin="normal"
            required
            id="walletpassword"
            label="지갑 비밀번호"
            type="password"
            value={walletpassword}
            onChange={walletpasswordChange}
          />
          <br />
          <TextField
            margin="normal"
            required
            id="walletpasswordCheck"
            label="지갑 비밀번호 확인"
            type="password"
            value={walletpasswordCheck}
            onChange={walletpasswordCheckChange}
          />
          <div>⭐️비밀번호 잃어버리면 안된다는 내용.⭐️</div>
          <br />
          <Link to="/">취소</Link>
          <Button variant="contained" color="color2">
            가입하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default Signup;
