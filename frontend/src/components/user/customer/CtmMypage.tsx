import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  IconButton,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import {
  getBalance,
  chargeClean,
  unlockAccount
} from '../../../store/actions/services/walletService';

import {
  InfoRequest,
  balanceUpdate,
  changeCtmInfo,
  deleteUser,
  logoutRequest
} from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';
import Address from '../../../components/common/Address';
import { LOGOUT } from '../../../store/actions/types/types';
import Swal from 'sweetalert2';

const options = [
  {
    id: 1,
    label: '닉네임 변경'
  },
  {
    id: 2,
    label: '비밀번호 변경'
  },
  {
    id: 3,
    label: '주소 변경'
  }
];

const CtmMypage = () => {
  // 로컬 저장 값
  const [userInfo, setUserInfo] = useState('');

  // 모달창
  const [openNickname, setOpenNickname] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCharge, setOpenCharge] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [clean, setClean] = useState<number>(0);
  const [myaddress, setMyaddress] = useState('');
  const [mynickname, setmynickname] = useState('');

  const [walletPassword, setWalletPassword] = useState('');
  const [chargeAmount, setchargeAmount] = useState<number>(0);

  // 비밀번호 변경 시 새로운 비밀번호 유효성 검사 및 일치 확인
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdSame, setIsPwdSame] = useState(false);

  // 닉네임 변경
  const [nickName, setNickName] = useState('');

  const dispatch = useDispatch();

  // 수정 메뉴
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (value) => {
    switch (value) {
      case 1:
        setOpenNickname(true);
        break;
      case 2:
        setOpenPassword(true);
        break;
      case 3:
        setOpenAddress(true);
        break;
      case 4:
        setOpenCharge(true);
        break;
      case 5:
        setOpenDelete(true);
        break;
      default:
        break;
    }
  };

  // 1 : 닉네임 / 2: 비밀번호 / 3 : 주소 / 4 : 충전 / 5 : 탈퇴
  const handleClose = (value) => {
    switch (value) {
      case 1:
        setOpenNickname(false);
        break;
      case 2:
        setOpenPassword(false);
        break;
      case 3:
        setOpenAddress(false);
        break;
      case 4:
        setOpenCharge(false);
        break;
      case 5:
        setOpenDelete(false);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const getMypage = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setUserInfo(result?.data?.userInfo);
      setMyaddress(
        `${result?.data?.userInfo?.addr} ${result?.data?.userInfo?.addrDetail}`
      );
      setmynickname(result?.data?.userInfo?.nickName);
      setClean(result?.data?.userInfo?.balance);
    } else {
      navigate('/error');
    }
  };

  const walletPasswordChange = (event) => {
    setWalletPassword(event.target.value.trim());
  };

  const chargeAmountChange = (event) => {
    if (event.target.value.trim() < 0) {
      setchargeAmount(0);
    } else {
      setchargeAmount(event.target.value.trim());
    }
  };

  useEffect(() => {
    getMypage();
  }, []);

  // 닉네임 변경 로직
  const nickNameChange = (event) => {
    setNickName(event.target.value.trim());
  };

  const handleNickname = async () => {
    const result = await changeCtmInfo({ nickName });
    if (result?.data?.message === 'Created') {
      setmynickname(nickName);
      handleClose(1);
      setNickName('');
    } else if (result?.data?.statusCode === 409) {
      Swal.fire({
        width: 200,
        icon: 'error',
        text: '이미 존재하는 닉네임입니다.'
      }).then(function () {
        setNickName('');
      });
    } else {
      navigate('/error');
    }
  };

  // 비밀번호 변경 로직
  const pwdChange = (event) => {
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

  const pwdCheckChange = (event) => {
    setPwdCheck(event.target.value.trim());
    setIsPwdSame(pwd === event.target.value.trim());
  };

  const handlePassword = async () => {
    const result = await changeCtmInfo({ pwd });
    if (result?.data?.message === 'Created') {
      setPwd('');
      handleClose(2);
    } else {
      navigate('/error');
    }
  };

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setMyaddress(value);
  };

  // 충전 로직
  const handleCharge = async () => {
    const check = await unlockAccount(userInfo.wallet, walletPassword);
    if (!check) {
      Swal.fire({
        width: 200,
        icon: 'error',
        text: '잘못된 비밀번호입니다.'
      });
      setWalletPassword('');
    } else {
      const send = await chargeClean(userInfo.wallet, chargeAmount);
      if (!send) {
        navigate('/error');
        return;
      }
      const balance = await getBalance(userInfo.wallet);
      if (!balance) {
        navigate('/error');
        return;
      }
      const balanceInfo = {
        balance
      };
      if (balance > 100000) {
        Swal.fire({
          width: 200,
          icon: 'error',
          text: '양심껏 가져가주세요 선생님'
        });
        return;
      }
      const result = await balanceUpdate(balanceInfo);
      if (!result) {
        navigate('/error');
        return;
      }
      setClean(balance);
      Swal.fire({
        width: 200,
        icon: 'sucess',
        text: '충전이 완료되었습니다.'
      }).then(function () {
        setWalletPassword('');
        setchargeAmount(0);
        handleClose(4);
      });
    }
  };

  // 회원 탈퇴 로직
  const handleDelete = async () => {
    const result = await deleteUser();
    if (result?.data?.message === 'Created') {
      Swal.fire({
        width: 200,
        icon: 'info',
        text: '그동안 세탁클로쓰를 이용해주셔서 감사합니다.'
      }).then(function () {
        logoutRequest();
        dispatch({
          type: LOGOUT
        });
        navigate('/');
      });
    } else {
      navigate('/error');
    }
  };
  return (
    <div className="ctm-mypage">
      <div className="ctm-mypage-img-box">
        <div className="ctm-mypage-img-left" />
        <div className="ctm-mypage-img-center">
          <img
            className="ctm-mypage-img"
            src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/user.png"
            alt="user-img"
          />
        </div>
        <div className="ctm-mypage-img-right">
          {/* 수정 메뉴 */}
          <IconButton
            aria-label="more"
            id="ctm-mypage-modify"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={menuClick}>
            <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }} color="color2" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={menuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch'
              }
            }}>
            {/* <div>

              </div> */}
            {options.map((option) => (
              <MenuItem key={option.id} onClick={menuClose}>
                <Button
                  onClick={() => handleOpen(option.id)}
                  sx={{ fontSize: 'small', fontWeight: 'bold', p: 0 }}
                  color="color2"
                  style={{ justifyContent: 'flex-start' }}>
                  {option.label}
                </Button>
              </MenuItem>
            ))}
            <MenuItem key={5} onclick={() => menuClose}>
              <Button
                onClick={() => handleOpen(5)}
                sx={{ fontSize: 'small', fontWeight: 'bold', p: 0 }}
                color="color0_2"
                style={{ justifyContent: 'flex-start' }}>
                회원 탈퇴하기
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="ctm-mypage-nickname">{mynickname}</div>
      <div className="ctm-mypage-email">{userInfo.userEmail}</div>
      <div className="ctm-mypage-addr">{myaddress}</div>

      <Box boxShadow={0} className="ctm-mypage-card">
        <div className="ctm-mypage-card-title">
          <div className="ctm-mypage-card-label">지갑 잔액</div>
          <Button
            size="small"
            color="color1"
            variant="contained"
            className="ctm-mypage-charge-btn"
            onClick={() => handleOpen(4)}>
            충전
          </Button>
        </div>
        <div className="ctm-mypage-cln">{clean} CLN</div>
        <Box className="ctm-mypage-box-warn">
          <div className="ctm-mypage-warn">
            서비스 이용을 위해 클린을 충전해보세요!
          </div>
        </Box>
      </Box>

      <div className="ctm-mypage-buttons">
        <Link to="/customer/orderlist" className="OrderList">
          <Button size="small" color="color1" variant="outlined">
            나의 주문
          </Button>
        </Link>
        <Link to="/customer/reviewlist" className="ReviewList">
          <Button size="small" color="color1" variant="outlined">
            나의 리뷰
          </Button>
        </Link>
        {/* <Link to="/customer/" className="FavoriteList">
          <Button size="small" color="color1" variant="outlined">
            즐겨찾기
          </Button>
        </Link> */}
      </div>

      {/* 닉네임 변경 모달 */}
      <Dialog open={openNickname} onClose={() => handleClose(1)}>
        <DialogTitle sx={{ fontSize: 'large', fontWeight: 'bold' }}>
          닉네임 변경하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 'medium', fontWeight: 'bold' }}>
            변경할 닉네임을 입력해주세요.
          </DialogContentText>
          <TextField
            sx={{ mt: 3, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            focused
            color="color2"
            autoFocus
            label="닉네임"
            value={nickName}
            onChange={nickNameChange}
            fullWidth
            variant="standard"
            placeholder="닉네임을 입력하세요."
            inputProps={{
              maxLength: 20
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(1)}
            color="color2"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            취소
          </Button>
          <Button
            onClick={handleNickname}
            color="color2"
            variant="contained"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            변경하기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 변경 모달 */}
      <Dialog open={openPassword} onClose={() => handleClose(2)}>
        <DialogTitle sx={{ fontSize: 'large', fontWeight: 'bold' }}>
          비밀번호 변경하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 'medium', fontWeight: 'bold' }}>
            변경할 비밀번호을 입력해주세요.
          </DialogContentText>
          <TextField
            sx={{ mt: 3, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            focused
            color="color2"
            autoFocus
            // margin="dense"
            label="비밀번호"
            type="password"
            value={pwd}
            onChange={pwdChange}
            fullWidth
            variant="standard"
            placeholder="비밀번호"
            inputProps={{
              maxLength: 16
            }}
          />
          <FormHelperText error={!!pwd && !isPwdValid}>
            {pwd
              ? isPwdValid
                ? '안전한 비밀번호입니다.'
                : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'
              : ''}
          </FormHelperText>
          <TextField
            sx={{ mt: 2, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            focused
            color="color2"
            autoFocus
            label="비밀번호 확인"
            type="password"
            value={pwdCheck}
            onChange={pwdCheckChange}
            fullWidth
            variant="standard"
            placeholder="비밀번호 확인"
            inputProps={{
              maxLength: 16
            }}
          />
          <FormHelperText error={!!pwdCheck && !isPwdSame}>
            {!pwdCheck || isPwdSame ? ' ' : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(2)}
            color="color2"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            취소
          </Button>
          <Button
            onClick={handlePassword}
            disabled={!isPwdValid || !isPwdSame}
            color="color2"
            variant="contained"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            변경하기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 주소 변경 모달 */}
      <Dialog open={openAddress} onClose={() => handleClose(3)}>
        <Address
          AddressFunc={AddressFunc}
          handleClose={handleClose}
          type="change"
        />
      </Dialog>

      {/* 회원 탈퇴 모달 */}
      <Dialog open={openDelete} onClose={() => handleClose(5)}>
        <DialogTitle sx={{ fontSize: 'large', fontWeight: 'bold' }}>
          회원 탈퇴
        </DialogTitle>
        <DialogContent sx={{ fontSize: 'medium', fontWeight: 'bold' }}>
          정말로 탈퇴하시겠습니까? 탈퇴 이후 정보는 되돌릴 수 없습니다.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(5)}
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            취소
          </Button>
          <Button
            onClick={handleDelete}
            color="color0"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>

      {/* CLN 충전 모달 */}
      <Dialog
        open={openCharge}
        onClose={() => handleClose(4)}
        sx={{ zIndex: 3 }}>
        <DialogTitle sx={{ fontSize: 'large', fontWeight: 'bold' }}>
          클린 충전하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 'medium' }}>
            지갑 비밀번호와 충전할 금액을 입력해주세요.
          </DialogContentText>
          <TextField
            sx={{ mt: 2, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            focused
            color="color1"
            autoFocus
            label="지갑 비밀번호"
            value={walletPassword}
            onChange={walletPasswordChange}
            type="password"
            fullWidth
            variant="standard"
            placeholder="지갑 비밀번호"
          />
          <TextField
            sx={{ mt: 2, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            focused
            color="color1"
            autoFocus
            label="충전할 금액"
            type="number"
            value={chargeAmount ? chargeAmount : ''}
            onChange={chargeAmountChange}
            fullWidth
            variant="standard"
            placeholder="지갑 비밀번호 확인"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(4)}
            color="color1"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            취소
          </Button>
          <Button
            onClick={handleCharge}
            color="color1"
            variant="contained"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            충전하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CtmMypage;
