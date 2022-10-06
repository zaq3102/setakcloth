import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  TextField
} from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  checkEmailRequest,
  signupCeoKakao,
  signupCeoRequest,
  signupCtmKakao,
  signupRequest
} from '../../store/actions/services/userService';
import { createWalletWe3 } from '../../store/actions/services/walletService';
import TOS from './TOS';

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
  const [open, setOpen] = useState(false);

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

  // 고객 / 사장님 toggle
  const tabContArr = [
    { title: '고객 회원 가입' },
    { title: '사장님 회원가입' }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      Swal.fire({
        width: 200,
        icon: 'error',
        text: '올바르지 않은 접근입니다.'
      });
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
      Swal.fire({
        width: 200,
        icon: 'success',
        text: '회원가입을 축하드립니다!'
      });
      navigate('/login');
    } else {
      Swal.fire({
        width: 200,
        icon: 'error',
        text: '회원가입에 실패하였습니다!'
      });
    }
  };

  const createWallet = async () => {
    setWalletClicked(true);
    const result = await createWalletWe3(walletpassword);
    setWalletAddr(result);
    setIsWalletCreated(true);
    Swal.fire({
      width: 200,
      icon: 'success',
      text: '지갑이 생성되었습니다!'
    });
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
    setPwdCheck('');
  };

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
          <div>
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
          {/* Content */}
          <Box
            component="span"
            sx={{
              width: '300px',
              p: 2,
              border: '1px solid #1e3e5c',
              borderBottomLeftRadius: '7px',
              borderBottomRightRadius: '7px'
            }}>
            <div className="signup-type">
              <Box sx={{ width: '90%', textAlign: 'left' }}>이메일</Box>
              <TextField
                margin="normal"
                required
                id="email"
                placeholder="이메일"
                value={email}
                onChange={emailChange}
                autoFocus
                sx={{ width: '90%', margin: 1 }}
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
              <Box sx={{ width: '90%', textAlign: 'left', mt: 2 }}>
                비밀번호
              </Box>
              <TextField
                margin="normal"
                required
                id="password"
                placeholder="비밀번호"
                type="password"
                value={pwd}
                onChange={passwordChange}
                sx={{ width: '90%', margin: 1 }}
              />
              <FormHelperText error={!!pwd && !isPwdValid}>
                {pwd
                  ? isPwdValid
                    ? '안전한 비밀번호입니다.'
                    : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'
                  : ''}
              </FormHelperText>
              <Box sx={{ width: '90%', textAlign: 'left', mt: 2 }}>
                {' '}
                비밀번호 확인
              </Box>
              <TextField
                margin="normal"
                required
                id="passwordcheck"
                placeholder="비밀번호 확인"
                type="password"
                value={pwdCheck}
                onChange={passwordCheckChange}
                sx={{ width: '90%', margin: 1 }}
              />
              <FormHelperText error={!!pwdCheck && !isPwdSame}>
                {!pwdCheck || isPwdSame ? ' ' : '비밀번호가 일치하지 않습니다.'}
              </FormHelperText>
              <FormControlLabel
                control={<Checkbox onClick={onClickTOS} />}
                label="세탁클로쓰의 이용약관에 동의합니다. (필수)"
              />

              <a href="#" onClick={handleClickOpen}>
                <div className="more">더보기</div>
              </a>
              <Dialog
                className="signup-tos-dialog"
                sx={{
                  height: '450px'
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>
                  <div className="alert-dialog-title">세탁클로쓰 이용약관</div>
                </DialogTitle>
                <DialogContent className="signup-tos-dialog-content">
                  <DialogContentText id="alert-dialog-description">
                    <TOS />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="color2">
                    확인
                  </Button>
                </DialogActions>
              </Dialog>

              {/* <TOS /> */}
              <div className="signup-btn">
                <Link to="/login">
                  <Button
                    variant="outlined"
                    sx={{ padding: 0.3, margin: 1 }}
                    color="color3">
                    취소
                  </Button>
                </Link>
                <Button
                  sx={{ padding: 0.3, margin: 1 }}
                  variant="outlined"
                  className="next-btn"
                  onClick={onClickChange}
                  color="color1"
                  disabled={
                    !isEmailValid ||
                    emailChecked !== 200 ||
                    !isPwdValid ||
                    !isPwdSame ||
                    !tosCheck
                  }>
                  <b>다음</b>
                </Button>
              </div>
              <div>
                <Button
                  sx={{ padding: 0, m: 2 }}
                  onClick={
                    activeIndex === 0
                      ? kakaoUserSignUpHandler
                      : kakaoCeoSignUpHandler
                  }>
                  <img
                    style={{ padding: 0, width: '75%' }}
                    alt="카카오 회원 가입"
                    src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/start_by_kakao.png"
                  />
                </Button>
              </div>
            </div>
          </Box>
        </div>
      ) : (
        <div className="signup-page">
          <Button
            sx={{
              borderTopLeftRadius: '7px',
              borderTopRightRadius: '7px',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px'
            }}
            className="signup-page-wallet-tag"
            variant="contained"
            color="color1"
            disableElevation>
            지갑 생성
          </Button>
          <Box
            component="span"
            sx={{
              width: '300px',
              p: 0,
              border: '1px solid #1e3e5c',
              borderBottomLeftRadius: '7px',
              borderBottomRightRadius: '7px'
            }}>
            <div className="signup-page">
              <div>
                <div className="rowspan">
                  <div className="rowspan-img-wrap">
                    <img
                      style={{ width: '70px' }}
                      src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/wallet.png"
                      alt=""
                    />
                  </div>
                  <div className="signup-wallet-title">
                    <span style={{ fontWeight: 'bold' }}>세탁클로쓰</span>는
                    블록체인으로 <br />
                    유통과정을 투명하게 보여주기 위해 <br />
                    지갑을 생성하고 있습니다.
                  </div>
                </div>
                <div className="rowspan">
                  <span
                    className="rowspan-warn"
                    style={{ fontWeight: 'bold', color: 'red' }}>
                    경고!
                  </span>
                  <div className="rowspan-warn-content">
                    1. 지갑 비밀번호는 잊어버리면 복구할 수 없습니다.
                    <br />
                    2. 비밀번호가 노출되면 자산 유실의 위험이 있습니다.
                  </div>
                </div>
              </div>
              <div className="wallet-textfields">
                <TextField
                  margin="normal"
                  required
                  id="walletpassword"
                  placeholder="지갑 비밀번호"
                  type="password"
                  value={walletpassword}
                  onChange={walletpasswordChange}
                  sx={{ width: '90%' }}
                />
                <TextField
                  margin="normal"
                  required
                  id="walletpasswordCheck"
                  placeholder="지갑 비밀번호 확인"
                  type="password"
                  value={walletpasswordCheck}
                  onChange={walletpasswordCheckChange}
                  sx={{ width: '90%' }}
                />
                <FormHelperText error={!isWalletPwdSame}>
                  {!walletpasswordCheck || isWalletPwdSame
                    ? ' '
                    : '비밀번호가 일치하지 않습니다.'}
                </FormHelperText>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="color1"
                  onClick={createWallet}
                  disabled={
                    !walletpasswordCheck || !isWalletPwdSame || walletClicked
                  }>
                  생성
                </Button>
              </div>
              <div className="signup-btn">
                <Button
                  variant="outlined"
                  sx={{ padding: 0.3, margin: 1 }}
                  color="color3"
                  onClick={() => setPage(1)}>
                  취소
                </Button>
                <Button
                  sx={{ padding: 0.3, margin: 1 }}
                  variant="outlined"
                  className="next-btn"
                  onClick={handleSubmit}
                  color="color1"
                  disabled={!isWalletCreated}>
                  <b>가입하기</b>
                </Button>
              </div>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Signup;
