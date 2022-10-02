import * as React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getBalance,
  chargeClean,
  unlockAccount
} from '../../../store/actions/services/walletService';
import {
  myorderCtmRequest,
  myReviewRequest
} from '../../../store/actions/services/orderService';
import {
  InfoRequest,
  LaundryLikeRequest,
  balanceUpdate,
  changeCtmInfo,
  deleteUser,
  logoutRequest
} from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';
import Address from '../../../components/common/Address';
import { LOGOUT } from '../../../store/actions/types/types';

const CtmMypage = () => {
  const [clean, setClean] = useState<number>(0);

  // 로컬 저장 값
  const [userInfo, setUserInfo] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [likeList, setLikeList] = useState([]);

  // 어떤 메뉴 클릭 했는지
  const [mode, setMode] = useState(1);
  const [modeState, setModeState] = useState(-1);
  const stateText = ['수락 대기중', '세탁중', '배달중', '세탁 완료'];

  // 모달창
  const [openNickname, setOpenNickname] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCharge, setOpenCharge] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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

  const getMyReviews = async () => {
    const result = await myReviewRequest();
    if (result?.data?.reviews) {
      setReviewList(result?.data?.reviews);
    } else {
      navigate('/error');
    }
  };

  const getMyOrders = async () => {
    const result = await myorderCtmRequest();
    if (result?.data?.orders) {
      setOrderList(result?.data?.orders);
    } else {
      navigate('/error');
    }
  };

  const getMyLikes = async () => {
    const result = await LaundryLikeRequest();
    if (result?.data?.laundrys) {
      setLikeList(result?.data?.laundrys);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getMypage();
    getMyReviews();
    getMyOrders();
    getMyLikes();
  }, []);

  const handleMode = (value) => {
    setMode(value);
    if (value === 1) {
      setModeState(-1);
    }
  };

  const handleModeState = (value) => {
    setModeState(value);
  };

  let content = '';
  if (mode === 1) {
    let orderTempList = orderList;
    if (modeState === 0) {
      orderTempList = orderList.filter((order) => order.state === 0);
    } else if (modeState === 1) {
      orderTempList = orderList.filter((order) => order.state === 1);
    } else if (modeState === 2) {
      orderTempList = orderList.filter((order) => order.state >= 2);
    }

    content = (
      <>
        {orderTempList.map((order) => (
          <Card
            sx={{ maxWidth: 2 / 7, maxHeight: 1 / 2, borderRadius: 10 }}
            className="ctm-mypage-right-bottom-review">
            <Link to={`../order/${order.orderId}`} key={order.orderId}>
              <CardMedia
                component="img"
                height="100"
                image="../assets/laundry1.jpg"
                alt="green iguana"
              />
              <CardContent
                className="ctm-mypage-right-bottom-review-text"
                sx={{ maxWidth: 1, maxHeight: 1 / 2 }}>
                <div>[주문 번호 : {order.orderId}]</div>
                <div>{stateText[order.state]}</div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </>
    );
  } else if (mode === 2) {
    content = (
      <>
        {reviewList.map((review, idx) => (
          <Card
            sx={{ maxWidth: 2 / 7, maxHeight: 1 / 2, borderRadius: 10 }}
            key={idx}
            className="ctm-mypage-right-bottom-review">
            <CardMedia
              component="img"
              height="100"
              image="../assets/laundry1.jpg"
              alt="green iguana"
            />
            <CardContent
              className="ctm-mypage-right-bottom-review-text"
              sx={{ maxWidth: 1, maxHeight: 1 / 2 }}>
              [{review.laundryName}] {review.content}
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else if (mode === 3) {
    content = (
      <>
        {likeList.map((like, idx) => (
          <Card
            sx={{ maxWidth: 2 / 7, maxHeight: 1 / 2, borderRadius: 10 }}
            className="ctm-mypage-right-bottom-review">
            <Link to={`../${like.laundryId}`} key={like.laundryId}>
              <CardMedia
                component="img"
                sx={{ height: 1 / 2 }}
                image="../assets/laundry1.jpg"
                alt="green iguana"
              />
              <CardContent
                className="ctm-mypage-right-bottom-review-text"
                sx={{ maxWidth: 1, maxHeight: 1 / 2 }}>
                {like.laundryName}
              </CardContent>
            </Link>
          </Card>
        ))}
      </>
    );
  }

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
  const changeAddress = (value) => {
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
      <CardContent className="ctm-mypage-left">
        <div className="ctm-mypage-left-top">
          <img
            className="ctm-mypage-left-top-profile"
            src="../assets/user.png"
            alt="user-img"
          />
        </div>
        <div className="ctm-mypage-left-bottom">
          <div className="ctm-mypage-left-bottom-content">
            <div className="ctm-mypage-left-bottom-clean">{clean} 클린</div>
            <div className="ctm-mypage-left-bottom-id">
              {userInfo.userEmail}
            </div>
            <div className="ctm-mypage-left-bottom-nickname">
              {mynickname || '닉네임을 바꿔주세요.'}
            </div>
            <div className="ctm-mypage-left-bottom-address">{myaddress}</div>
          </div>
          <div className="ctm-mypage-left-bottom-chips">
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="닉네임 변경"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(1)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="비밀번호 변경"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(2)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="주소 변경"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(3)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="충전하기"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(4)}
            />
            <div onClick={() => handleOpen(5)}>회원 탈퇴</div>
          </div>
        </div>
      </CardContent>
      <div className="ctm-mypage-right">
        <div className="ctm-mypage-right-top">
          <Chip
            className={`ctm-mypage-right-top-chip ${
              mode === 1 ? 'ctm-right-top-chip-selected' : null
            }`}
            label="나의 주문"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'rgb(250, 209, 226)',
              fontSize: 'medium'
            }}
            onClick={() => handleMode(1)}
          />
          <Chip
            className={`ctm-mypage-right-top-chip ${
              mode === 2 ? 'ctm-right-top-chip-selected' : null
            }`}
            label="나의 리뷰"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'rgb(250, 209, 226)',
              fontSize: 'medium'
            }}
            onClick={() => handleMode(2)}
          />
          <Chip
            className={`ctm-mypage-right-top-chip ${
              mode === 3 ? 'ctm-right-top-chip-selected' : null
            }`}
            label="나의 즐겨찾기"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'rgb(250, 209, 226)',
              fontSize: 'medium'
            }}
            onClick={() => handleMode(3)}
          />
        </div>
        {mode === 1 ? (
          <div className="ctm-mypage-right-medium">
            <Chip
              className="ctm-mypage-right-medium-chip"
              label="전체"
              style={{
                height: 20,
                width: 140
              }}
              onClick={() => handleModeState(-1)}
            />
            <Chip
              className="ctm-mypage-right-medium-chip"
              label="수락 대기중"
              style={{
                height: 20,
                width: 140
              }}
              onClick={() => handleModeState(0)}
            />
            <Chip
              className="ctm-mypage-right-medium-chip"
              label="세탁중"
              style={{
                height: 20,
                width: 140
              }}
              onClick={() => handleModeState(1)}
            />
            <Chip
              className="ctm-mypage-right-medium-chip"
              label="완료"
              style={{
                height: 20,
                width: 140
              }}
              onClick={() => handleModeState(2)}
            />
          </div>
        ) : (
          <div className="ctm-mypage-right-medium" />
        )}
        <div className="ctm-mypage-right-bottom">{content}</div>
      </div>

      {/* 모달 모음집 */}
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

      <Dialog open={openAddress} onClose={() => handleClose(3)}>
        <Address changeAddress={changeAddress} handleClose={handleClose} />
      </Dialog>

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
    </div>
  );
};

export default CtmMypage;
