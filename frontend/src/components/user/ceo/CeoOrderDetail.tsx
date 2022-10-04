import { Button, Dialog, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UploadPhoto from '../../common/UploadPhoto';
import {
  changeState,
  getFromAddrRequest,
  getOrderRequest
} from '../../../store/actions/services/orderService';
import { InfoRequest } from '../../../store/actions/services/userService';

const CeoOrderDetail = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(0);
  const { orderNum } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [fromAddr, setFromAddr] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [imageList, setImageList] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const imgCnt = 2;
  const [imgSrc, setImgSrc] = useState([]);
  const [orderDetailId, setOrderDetailId] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [allUploaded, setAllUploaded] = useState([false]);

  const [modes, setModes] = useState([]);

  const getList = async () => {
    const result = await getOrderRequest(orderNum);
    if (result?.data) {
      setOrderInfo(result?.data);
      setCurrentState(result?.data?.state);
      if (result?.data?.orderType === 'DELIVERY') {
        setModes(['수락 대기중', '세탁중', '배달중', '배달 완료']);
      } else if (result?.data?.orderType === 'PICKUP') {
        setModes(['수락 대기중', '세탁중', '세탁 완료', '수거 완료']);
      }
      setOrderDetail(result?.data?.orderDetails);
      const temp = [];
      for (let i = 0; i < result?.data?.orderDetails.length; i += 1) {
        temp.push(false);
      }
      setAllUploaded(temp);
    } else {
      navigate('/error');
    }
  };

  console.log(orderInfo);
  console.log(userInfo);

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

  const handleClose = () => {
    setOpenImage(false);
  };

  const ImgUploadBtnClick = (value, index) => {
    setOpenImage(true);
    setOrderDetailId(value);
    setSelectedItem(index);
  };

  // 이미지 변경 로직
  const changeImageSrc = (value) => {
    const newArr1 = [...orderDetail];
    newArr1[selectedItem][`blockAddr${currentState + 1}ImgUrls`] = value;
    setOrderDetail(newArr1);
    const newArr2 = [...allUploaded];
    newArr2[selectedItem] = true;
    setAllUploaded(newArr2);
  };

  const nextState = async () => {
    const result = await changeState(orderNum);
    if (result?.data?.message === 'Success') {
      setCurrentState(result?.data?.state);
    } else {
      navigate('/error');
    }
  };

  return (
    <div className="ceo-order-detail">
      <div className="ceo-order-detail-info">
        {orderInfo.orderType === 'DELIVERY' ? (
          <div>
            {orderInfo.userAddr} {orderInfo.userAddrDetail}
          </div>
        ) : (
          <></>
        )}
        <div>주문 고객 : {orderInfo.userNickName}</div>
      </div>
      <div className="ceo-order-detail-state">
        <Stepper activeStep={currentState}>
          {modes.map((mode) => (
            <Step key={mode}>
              <StepLabel>{mode}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          variant="contained"
          color="color2"
          onClick={nextState}
          disabled={allUploaded.includes(false)}>
          저장 후 다음 단계
        </Button>
      </div>
      <div className="ceo-order-detail-upload">
        {orderDetail.map((order, idx1) => (
          <div key={idx1}>
            <div className="ceo-order-detail-upload-text">{order.name}</div>
            <div className="ceo-order-detail-upload-info">
              <div className="ceo-order-detail-upload-img">
                {order[`blockAddr${currentState + 1}ImgUrls`].map(
                  (url, idx2) => (
                    <img
                      src={`http://j7a706.p.ssafy.io/ipfs/${url}`}
                      key={`img-${idx2}`}
                      alt={`img-${idx2}`}
                      style={{ height: 100 }}
                    />
                  )
                )}
              </div>
              <Button
                variant="contained"
                color="color2"
                className="ceo-order-detail-upload-button"
                onClick={() => ImgUploadBtnClick(order.orderDetailId, idx1)}
                disabled={
                  order[`blockAddr${currentState + 1}ImgUrls`].length !== 0
                }>
                사진 업로드
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* 모달창 모음집 */}
      <Dialog open={openImage} onClose={() => handleClose}>
        <UploadPhoto
          changeImageSrc={changeImageSrc}
          handleClose={handleClose}
          imgCnt={imgCnt}
          id={orderDetailId}
        />
      </Dialog>
    </div>
  );
};

export default CeoOrderDetail;
