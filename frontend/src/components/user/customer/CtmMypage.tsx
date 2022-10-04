import * as React from 'react';
import {
  Button,
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
  },
  {
    id: 5,
    label: '회원 탈퇴하기'
  }
];

const CtmMypage = () => {
  const [clean, setClean] = useState<number>(0);

  // 로컬 저장 값
  const [userInfo, setUserInfo] = useState('');

  // 모달창
  const [openNickname, setOpenNickname] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCharge, setOpenCharge] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [myaddress, setMyaddress] = useState('');
  const [addrInfo, setAddrInfo] = useState(null);
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
      alert('이미 존재하는 닉네임입니다.');
      setNickName('');
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
      alert('잘못된 비밀번호입니다.');
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
      const result = await balanceUpdate(balanceInfo);
      if (!result) {
        navigate('/error');
        return;
      }
      setClean(balance);
      alert('충전이 완료되었습니다.');
      setWalletPassword('');
      setchargeAmount(0);
      handleClose(4);
    }
  };

  // 회원 탈퇴 로직
  const handleDelete = async () => {
    const result = await deleteUser();
    if (result?.data?.message === 'Created') {
      alert('그동안 세탁클로쓰를 이용해주셔서 감사합니다.');
      logoutRequest();
      dispatch({
        type: LOGOUT
      });
      navigate('/');
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
            <ModeEditOutlineOutlinedIcon sx={{ fontSize: 20 }} color="color1" />
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
            {options.map((option) => (
              <MenuItem key={option.id} onClick={menuClose}>
                <Button onClick={() => handleOpen(option.id)}>
                  {option.label}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className="ctm-mypage-nickname">{userInfo.nickName}</div>
      <div className="ctm-mypage-email">{userInfo.userEmail}</div>
      <div className="ctm-mypage-addr">{myaddress}</div>

      <Box boxShadow={0} className="ctm-mypage-card">
        <div className="ctm-mypage-card-title">
          <div className="ctm-mypage-card-label">지갑 잔액</div>
          <Button
            size="small"
            color="color1"
            variant="contained"
            className="ctm-mypage-charge-btn
            "
            onClick={() => handleOpen(4)}>
            충전
          </Button>
        </div>
        <div className="ctm-mypage-cln">{clean} CLN</div>
        <Box className="ctm-mypage-box-warn">
          <div className="ctm-mypage-warn">
            잔액이 부족하면 세탁서비스를 이용하실 수 없습니다.
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
        <Link to="/customer/favoritelist" className="FavoriteList">
          <Button size="small" color="color1" variant="outlined">
            즐겨찾기
          </Button>
        </Link>
      </div>

      {/* 닉네임 변경 모달 */}
      <Dialog open={openNickname} onClose={() => handleClose(1)}>
        <DialogTitle>닉네임 변경하기</DialogTitle>
        <DialogContent>
          <DialogContentText>변경할 닉네임을 입력해주세요.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="닉네임"
            type="text"
            value={nickName}
            onChange={nickNameChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(1)}>취소</Button>
          <Button onClick={handleNickname}>변경하기</Button>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 변경 모달 */}
      <Dialog open={openPassword} onClose={() => handleClose(2)}>
        <DialogTitle>비밀번호 변경하기</DialogTitle>
        <DialogContent>
          <DialogContentText>변경할 비밀번호을 입력해주세요.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="비밀번호"
            type="password"
            value={pwd}
            onChange={pwdChange}
            fullWidth
            variant="standard"
          />
          <FormHelperText error={!!pwd && !isPwdValid}>
            {pwd
              ? isPwdValid
                ? '안전한 비밀번호입니다.'
                : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'
              : ''}
          </FormHelperText>
          <TextField
            margin="dense"
            label="비밀번호 확인"
            type="password"
            value={pwdCheck}
            onChange={pwdCheckChange}
            fullWidth
            variant="standard"
          />
          <FormHelperText error={!!pwdCheck && !isPwdSame}>
            {!pwdCheck || isPwdSame ? ' ' : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(2)}>취소</Button>
          <Button onClick={handlePassword} disabled={!isPwdValid || !isPwdSame}>
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
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent>
          정말로 탈퇴하시겠습니까? 탈퇴 이후 정보는 되돌릴 수 없습니다.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(5)}>취소</Button>
          <Button onClick={handleDelete} color="color0">
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>

      {/* CLN 충전 모달 */}
      <Dialog open={openCharge} onClose={() => handleClose(4)}>
        <DialogTitle>클린 충전하기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            지갑 비밀번호와 충전할 금액을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="지갑 비밀번호"
            value={walletPassword}
            onChange={walletPasswordChange}
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="충전할 금액"
            type="number"
            value={chargeAmount}
            onChange={chargeAmountChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(4)}>취소</Button>
          <Button onClick={handleCharge}>충전하기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CtmMypage;
