import { Button, Step, StepLabel, Stepper } from '@mui/material';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

const CeoOrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const ImageShow = useRef<HTMLDivElement>();
  const ImageInput = useRef<HTMLInputElement>();
  const [currentMode, setCurrentMode] = useState(0);

  const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];
  const orderInfo = {
    orderId: 'anonymous_456',
    orderNum: 'S1234',
    orderDeliver: 'O',
    orderAddr: '평안남도 평양시 칠팔구 고노도로 12',
    orderReq: '없음'
  };

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

  const handleSave = () => {
    navigate('/ceo');
  };

  const handleNext = () => {
    navigate('/ceo');
  };

  const handleCancel = () => {
    navigate('/ceo');
  };

  return (
    <div className="ceo-order">
      <div className="ceo-order-detail">
        <div className="ceo-photo-upload">
          <div className="ceo-scrollmenu" ref={ImageShow}>
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
            <img className="logo" src="../assets/logo.png" alt="" />
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
            주문자 : {orderInfo.orderId}
          </div>
          <div className="ceo-order-info-detail">
            주문번호 : {orderInfo.orderNum}
          </div>
          <div className="ceo-order-info-detail">
            배송여부 : {orderInfo.orderDeliver}
          </div>
          <div className="ceo-order-info-detail">
            주소 : {orderInfo.orderAddr}
          </div>
          <div className="ceo-order-info-detail">
            특이사항 : {orderInfo.orderReq}
          </div>
        </div>
      </div>
      <div className="ceo-order-mode">
        <Stepper activeStep={currentMode}>
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
