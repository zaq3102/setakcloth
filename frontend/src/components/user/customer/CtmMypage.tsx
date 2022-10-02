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
  TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getBalance,
  chargeClean,
  unlockAccount
} from '../../../store/actions/services/walletService';
import Loading from '../../../components/common/Loading';
import {
  myorderCtmRequest,
  myReviewRequest
} from '../../../store/actions/services/orderService';
import {
  InfoRequest,
  LaundryLikeRequest,
  balanceUpdate
} from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';
import Address from '../../../components/common/Address';

const CtmMypage = () => {
  const [clean, setClean] = useState<number>(0);
  const [point, setPoint] = useState<number>(12340);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState(1);
  const [modeState, setModeState] = useState(-1);
  const stateText = ['수락 대기중', '세탁중', '배달중', '세탁 완료'];
  const [openNickname, setOpenNickname] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openCharge, setOpenCharge] = useState(false);
  const [myaddress, setMyaddress] = useState('');
  const [walletPassword, setWalletPassword] = useState('');
  const [chargeAmount, setchargeAmount] = useState<number>(0);

  const handleOpen = (value) => {
    switch (value) {
      case 1:
        setOpenNickname(true);
        break;
      case 2:
        setOpenAddress(true);
        break;
      case 3:
        setOpenCharge(true);
        break;
      default:
        break;
    }
  };

  const handleClose = (value) => {
    switch (value) {
      case 1:
        setOpenNickname(false);
        break;
      case 2:
        setOpenAddress(false);
        break;
      case 3:
        setOpenCharge(false);
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
    } else {
      navigate('/error');
    }
  };

  const walletPasswordChange = (event) => {
    setWalletPassword(event.target.value.trim());
  };

  const chargeAmountChange = (event) => {
    setchargeAmount(event.target.value.trim());
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
              {review.content}
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
  const handleNickname = () => {};

  // 주소 변경 로직
  const changeAddress = (value) => {
    setMyaddress(value);
  };

  // 충전 로직
  const handleCharge = async () => {
    const check = await unlockAccount(userInfo.wallet, walletPassword);
    console.log(check);
    if (!check) {
      alert('잘못된 비밀번호입니다');
    } else {
      const send = await chargeClean(userInfo.wallet, chargeAmount);
      console.log(send);
      const balance = await getBalance(userInfo.wallet);
      const balanceInfo = {
        balance
      };
      await balanceUpdate(balanceInfo);
      await getMypage();
      alert('충전완료');
      handleClose(3);
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
            <div className="ctm-mypage-left-bottom-clean">
              {userInfo.balance}클린
            </div>
            <div className="ctm-mypage-left-bottom-nickname">
              {userInfo.nickName ? userInfo.nickName : '닉네임을 바꿔주세요.'}
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
              label="주소 변경"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(2)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="충전하기"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              onClick={() => handleOpen(3)}
            />
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
      <div>
        <Dialog open={openNickname} onClose={() => handleClose(1)}>
          <DialogTitle>닉네임 변경하기</DialogTitle>
          <DialogContent>
            <DialogContentText>변경할 닉네임을 입력해주세요.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="닉네임"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(1)}>취소</Button>
            <Button onClick={handleNickname}>변경하기</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openAddress} onClose={() => handleClose(2)}>
          <Address changeAddress={changeAddress} handleClose={handleClose} />
        </Dialog>
      </div>

      <div>
        <Dialog open={openCharge} onClose={() => handleClose(3)}>
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
            <Button onClick={() => handleClose(3)}>취소</Button>
            <Button onClick={handleCharge}>충전하기</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CtmMypage;
