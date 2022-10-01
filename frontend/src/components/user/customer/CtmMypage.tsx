import * as React from 'react';
import { Card, CardContent, CardMedia, Chip } from '@mui/material';
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
  LaundryLikeRequest
} from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';

const CtmMypage = () => {
  const [clean, setClean] = useState<number>(12340000000000);
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
  const navigate = useNavigate();

  const getMypage = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setUserInfo(result?.data?.userInfo);
    } else {
      navigate('/error');
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
          <Link to={`../order/${order.orderId}`} key={order.orderId}>
            <Card
              sx={{ maxWidth: 250, maxHeight: 250, borderRadius: 10 }}
              className="ctm-mypage-right-bottom-review">
              <CardMedia
                component="img"
                height="100"
                image="../assets/laundry1.jpg"
                alt="green iguana"
              />
              <CardContent
                className="ctm-mypage-right-bottom-review-text"
                sx={{ maxWidth: 250, maxHeight: 150 }}>
                {order.orderId}
              </CardContent>
            </Card>
          </Link>
        ))}
      </>
    );
  } else if (mode === 2) {
    content = (
      <>
        {reviewList.map((review, idx) => (
          <Card
            sx={{ maxWidth: 250, maxHeight: 250, borderRadius: 10 }}
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
              sx={{ maxWidth: 250, maxHeight: 150 }}>
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
          <Link to={`../${like.laundryId}`} key={like.laundryId}>
            <Card
              sx={{ maxWidth: 250, maxHeight: 250, borderRadius: 10 }}
              className="ctm-mypage-right-bottom-review">
              <CardMedia
                component="img"
                height="100"
                image="../assets/laundry1.jpg"
                alt="green iguana"
              />
              <CardContent
                className="ctm-mypage-right-bottom-review-text"
                sx={{ maxWidth: 250, maxHeight: 150 }}>
                {like.laundryName}
              </CardContent>
            </Card>
          </Link>
        ))}
      </>
    );
  }
  return (
    <div className="ctm-mypage">
      <div className="ctm-mypage-left">
        <div className="ctm-mypage-left-top">
          <img
            className="ctm-mypage-left-top-profile"
            src="../assets/user.png"
            alt="user-img"
          />
        </div>
        <div className="ctm-mypage-left-bottom">
          <div className="ctm-mypage-left-bottom-content">
            <div className="ctm-mypage-left-bottom-nickname">
              {userInfo.nickName ? userInfo.nickName : '닉네임을 바꿔주세요.'}
            </div>
            <div className="ctm-mypage-left-bottom-address">
              {userInfo.addr} {userInfo.addrDetail}
            </div>
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
              // onClick={() => handleMode(0)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="주소 변경"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              // onClick={() => handleMode(0)}
            />
            <Chip
              className="ctm-mypage-left-bottom-chip"
              label="충전하기"
              style={{
                height: 40,
                width: 140,
                background: 'linear-gradient(#e66465, #FFD6EC)'
              }}
              // onClick={() => handleMode(0)}
            />
          </div>
        </div>
      </div>
      <div className="ctm-mypage-right">
        <div className="ctm-mypage-right-top">
          <Chip
            className="ctm-mypage-right-top-chip"
            label="나의 주문"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'linear-gradient(#e66465, #FFD6EC)'
            }}
            onClick={() => handleMode(1)}
          />
          <Chip
            className="ctm-mypage-right-top-chip"
            label="나의 리뷰"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'linear-gradient(#e66465, #FFD6EC)'
            }}
            onClick={() => handleMode(2)}
          />
          <Chip
            className="ctm-mypage-right-top-chip"
            label="나의 즐겨찾기"
            style={{
              height: 40,
              width: 140,
              marginRight: 20,
              background: 'linear-gradient(#e66465, #FFD6EC)'
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
    </div>
  );
};

export default CtmMypage;
