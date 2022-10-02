import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  checkEmailRequest,
  signupCeoKakao,
  signupCeoRequest,
  signupCtmKakao,
  signupRequest
} from '../../store/actions/services/userService';
import TOS from './TOS';
import { createWalletWe3 } from '../../store/actions/services/walletService';

// import Web3 from 'web3';
const Web3 = require('web3');

export const web3 = new Web3(
  new Web3.providers.HttpProvider(`${process.env.REACT_APP_ETH_URL}`)
);

const Signup: React.FC = () => {
  const [mode, setMode] = useState('customer');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [walletpassword, setWalletPassword] = useState('');
  const [walletpasswordCheck, setWalletPasswordCheck] = useState('');
  const [tosCheck, setTosCheck] = useState(false);
  const [page, setPage] = useState(1);
  const { state } = useLocation();

  const navigate = useNavigate();

  // 유효성 확인 결과 변수
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdSame, setIsPwdSame] = useState(false);
  const [isWalletPwdSame, setIsWalletPwdSame] = useState(false);
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  // 이메일 중복 체크
  const [emailChecked, setEmailChecked] = useState(false);

  // 지갑 주소
  const [walletAddr, setWalletAddr] = useState(false);
  const [walletClicked, setWalletClicked] = useState(false);

  useEffect(() => {
    if (state?.url === 'usersignup') {
      setMode('customer');
      setEmail(state?.kakaoemail);
      setPage(2);
    } else if (state?.url === 'ceosignup') {
      setMode('ceo');
      setEmail(state?.kakaoemail);
      setPage(2);
    } else {
      setEmailChecked(false);
    }
    // return () => {
    // console.log('컴포넌트가 화면에서 사라짐');
    // };
  }, [email]);

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

    setPwd(event.target.value.trim());
    setIsPwdValid(valid);

    if (event.target.value.trim() && valid) {
      setIsPwdSame(
        event.target.value.trim() && event.target.value.trim() === pwdCheck
      );
    }
  };

  const passwordCheckChange = (event) => {
    setPwdCheck(event.target.value.trim());
    setIsPwdSame(pwd === event.target.value.trim());
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
    setIsWalletPwdSame(walletpassword === event.target.value.trim());
  };

  const onClickChange = () => {
    setPage(2);
  };

  const handleSubmit = async () => {
    let userInfo = {};
    if (pwd) {
      userInfo = {
        email,
        pwd,
        walletAddr
      };
    } else {
      userInfo = {
        email,
        walletAddr
      };
    }
    let result = '';
    if (mode === 'customer') {
      if (pwd) {
        result = await signupRequest(userInfo);
      } else {
        result = await signupCtmKakao(userInfo);
      }
    } else if (mode === 'ceo') {
      if (pwd) {
        result = await signupCeoRequest(userInfo);
      } else {
        result = await signupCeoKakao(userInfo);
      }
    }

    if (result?.data?.message === 'Created') {
      alert('회원가입을 축하드립니다!');
      navigate('/login');
    } else {
      alert('회원가입에 실패하였습니다!');
    }
  };

  const createWallet = async () => {
    setWalletClicked(true);
    const result = await createWalletWe3(walletpassword);
    setWalletAddr(result);
    setIsWalletCreated(true);
    alert('지갑이 생성되었습니다!');
  };

  // const getMyWallet = async () => {
  //   const result = await getBalance(
  //     '0x71D46EEBCD8eD64BDA37e4D5532427c1881f2E34'
  //   );
  //   console.log(result);
  //   // if (result?.data?.userInfo) {
  //   //   setUserInfo(result?.data?.userInfo);
  //   // } else {
  //   //   console.log('error');
  //   // }
  // };

  const kakaoUserSignUpHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_REST}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakao/usersignup`;
  };

  const kakaoCeoSignUpHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_REST}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakao/ceosignup`;
  };

  return (
    <div>
      {page === 1 ? (
        <div className="signup-page">
          <div className="signup-type">
            <button
              type="button"
              onClick={() => setMode('customer')}
              className={`${
                mode === 'customer' ? 'mode-selected' : 'mode-not-selected'
              }`}>
              고객 회원가입
            </button>
            <button
              type="button"
              onClick={() => setMode('ceo')}
              className={`${
                mode === 'ceo' ? 'mode-selected' : 'mode-not-selected'
              }`}>
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
            sx={{ width: 300 }}
          />
          <FormHelperText
            error={!!email && (!isEmailValid || emailChecked !== 200)}>
            {email
              ? isEmailValid
                ? emailChecked
                  ? emailChecked === 200
                    ? '사용 가능한 이메일입니다.'
                    : '이미 사용중인 이메일입니다.'
                  : '이메일 중복 여부를 확인중입니다.'
                : '유효하지 않은 이메일 형식입니다.'
              : ''}
          </FormHelperText>
          <TextField
            margin="normal"
            required
            id="password"
            label="비밀번호"
            type="password"
            value={pwd}
            onChange={passwordChange}
            sx={{ width: 300 }}
          />
          <FormHelperText error={!!pwd && !isPwdValid}>
            {pwd
              ? isPwdValid
                ? '안전한 비밀번호입니다.'
                : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'
              : ''}
          </FormHelperText>
          <TextField
            margin="normal"
            required
            id="passwordcheck"
            label="비밀번호 확인"
            type="password"
            value={pwdCheck}
            onChange={passwordCheckChange}
            sx={{ width: 300 }}
          />
          <FormHelperText error={!!pwdCheck && !isPwdSame}>
            {!pwdCheck || isPwdSame ? ' ' : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
          <FormControlLabel
            control={<Checkbox onClick={onClickTOS} />}
            label="세탁클로쓰의 이용약관에 동의합니다. (필수)"
          />
          <TOS />
          <div className="signup-btn">
            <Link to="/">취소</Link>
            <button
              className="next-btn"
              type="button"
              onClick={onClickChange}
              disabled={
                !isEmailValid ||
                emailChecked !== 200 ||
                !isPwdValid ||
                !isPwdSame ||
                !tosCheck
              }>
              다음
            </button>
          </div>
          <div>
            <button className="w-12" onClick={kakaoUserSignUpHandler}>
              <img alt="카카오 고객 회원 가입" className="kakao object-fill" />
            </button>
            <button className="w-12" onClick={kakaoCeoSignUpHandler}>
              <img
                alt="카카오 사장님 회원 가입"
                className="kakao object-fill"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="wallet-page">
          <div>지갑 생성!</div>
          <TextField
            margin="normal"
            required
            id="walletpassword"
            label="지갑 비밀번호"
            type="password"
            value={walletpassword}
            onChange={walletpasswordChange}
            sx={{ width: 300 }}
          />
          <TextField
            margin="normal"
            required
            id="walletpasswordCheck"
            label="지갑 비밀번호 확인"
            type="password"
            value={walletpasswordCheck}
            onChange={walletpasswordCheckChange}
            sx={{ width: 300 }}
          />
          <FormHelperText error={!isWalletPwdSame}>
            {!walletpasswordCheck || isWalletPwdSame
              ? ' '
              : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
          <div>
            <p>
              ⭐️ 지갑 비밀번호는 서비스 내에서 저장하지 않습니다. 잊어버리시는
              경우 찾을 수 없으니 유의하여 기억해두시길 바랍니다. ⭐️
            </p>
            <Button
              variant="contained"
              onClick={createWallet}
              disabled={
                !walletpasswordCheck || !isWalletPwdSame || walletClicked
              }>
              생성
            </Button>
          </div>
          <div className="signup-btn">
            <Link to="/">취소</Link>
            <Button
              variant="contained"
              color="color2"
              disabled={!isWalletCreated}
              onClick={handleSubmit}
              sx={{ ml: 5 }}>
              가입하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
