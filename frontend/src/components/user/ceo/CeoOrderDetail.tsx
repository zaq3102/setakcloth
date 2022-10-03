import { Button, Step, StepLabel, Stepper } from '@mui/material';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getOrderRequest,
  getFromAddrRequest
} from '../../../store/actions/services/orderService';
import {
  InfoRequest,
  balanceUpdate
} from '../../../store/actions/services/userService';
import {
  getBalance,
  sendClean,
  unlockAccount
} from '../../../store/actions/services/walletService';

const CeoOrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const ImageShow = useRef<HTMLDivElement>();
  const ImageInput = useRef<HTMLInputElement>();
  const [currentState, setCurrentState] = useState(0);
  const { orderNum } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [fromAddr, setFromAddr] = useState('');
  const [userInfo, setUserInfo] = useState('');

  const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];

  const getList = async () => {
    const result = await getOrderRequest(orderNum);
    if (result?.data) {
      setOrderInfo(result?.data);
      setCurrentState(result?.data?.state);
    } else {
      navigate('/error');
    }
  };
  // 고객 지갑 가져오기
  const getFromAddr = async () => {
    const result = await getFromAddrRequest(orderNum);
    if (result?.data) {
      setFromAddr(result?.data);
    } else {
      navigate('/error');
    }
  };

  const getMypage = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setUserInfo(result?.data?.userInfo);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getList();
    getFromAddr();
    getMypage();
  }, []);

  const onImgInputBtnClick = (event) => {
    event.preventDefault();
    ImageInput.current.click();
  };

  const handleImgInput = (event) => {
    const imgList = event?.target?.files;
    for (let i = 0; i < imgList.length; i += 1) {
      const photo = document.createElement('img');
      photo.src = URL.createObjectURL(imgList[i]);
      photo.height = 280;
      photo.className = 'ceo-photo';
      ImageShow.current.appendChild(photo);
    }
  };

  const onImgInputSave = () => {
    // 이미지 저장 작업
    console.log('이미지 저장 완료');
  };

  const handleSave = () => {};

  const handleNext = async () => {
    // 처음 상태일 때.. 결제진행
    if (currentState === 0) {
      // 비밀번호 검증 여기 해줘야됨
      const check = await unlockAccount(userInfo.wallet, 'a12341234');
      if (!check) {
        alert('비밀번호가 틀립니다');
        return;
      }
      const result = await sendClean(
        fromAddr.fromAddr1,
        userInfo.wallet,
        fromAddr.price
      );
      if (!result) {
        alert('결제 오류 발생');
        navigate('/error');
        return;
      }
      const balance = await getBalance(userInfo.wallet);
      if (!balance) {
        alert('결제 오류 발생');
        navigate('/error');
        return;
      }
      const balanceInfo = {
        balance
      };
      const DBbalance = await balanceUpdate(balanceInfo);

      if (!DBbalance) {
        alert('결제 오류 발생');
        navigate('/error');
        return;
      }
    }
    // order의 state 바꾸고 사진 넣는 부분 구현 필요
    // 사진 넣고 보내는 로직
    // order detail 업데이트 해야 된다.
    setCurrentState(currentState + 1);
  };

  const handleCancel = () => {
    navigate('/ceo');
  };

  return (
    <div className="ceo-order">
      <div className="ceo-order-detail">
        <div className="ceo-photo-upload">
          <div className="ceo-scrollmenu" ref={ImageShow}>
            <img
              className="logo"
              src="https://via.placeholder.com/150/BFD7EA/111111"
              alt=""
            />
            <img
              className="logo"
              src="https://via.placeholder.com/150/BFD7EA/111111"
              alt=""
            />
            <img
              className="logo"
              src="https://via.placeholder.com/150/BFD7EA/111111"
              alt=""
            />
            <img
              className="logo"
              src="https://via.placeholder.com/150/BFD7EA/111111"
              alt=""
            />
            <img
              className="logo"
              src="https://via.placeholder.com/150/BFD7EA/111111"
              alt=""
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImgInput(event)}
            style={{ display: 'none' }}
            ref={ImageInput}
            multiple
          />
          <div className="ceo-btn-list">
            <Button
              variant="contained"
              color="color1"
              onClick={onImgInputBtnClick}>
              사진 업로드
            </Button>
            <Button variant="contained" color="color2" onClick={onImgInputSave}>
              저장하기
            </Button>
          </div>
        </div>
        <div className="ceo-order-info">
          <div className="ceo-order-info-title">주문 상세 정보</div>
          <div className="ceo-order-info-detail">
            주문번호 : {orderInfo.orderId}
          </div>
          <div className="ceo-order-info-detail">
            주문자 :{' '}
            {orderInfo.userNickName ? orderInfo.userNickName : 'Anonymous'}
          </div>
          <div className="ceo-order-info-detail">
            배송 여부 : {orderInfo.orderType === 'DELIVER' ? '배달' : '수거'}
          </div>
          <div className="ceo-order-info-detail">
            주소 : {orderInfo.userAddr} {orderInfo.userAddrDetail}
          </div>
        </div>
      </div>
      <div className="ceo-order-mode">
        <Stepper activeStep={currentState}>
          {modes.map((mode) => (
            <Step key={mode}>
              <StepLabel>{mode}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="ceo-btn-list">
        <Button variant="contained" color="color2" onClick={handleSave}>
          저장
        </Button>
        <Button variant="contained" color="color3" onClick={handleNext}>
          저장 후 다음 단계
        </Button>
        <Button variant="contained" color="color5" onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default CeoOrderDetail;
