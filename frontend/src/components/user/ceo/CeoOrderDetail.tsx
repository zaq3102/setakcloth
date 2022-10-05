import {
  Button,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
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
  const [currentState, setCurrentState] = useState(4);
  const [realState, setRealState] = useState(4);
  const { orderNum } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [fromAddr, setFromAddr] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [openImage, setOpenImage] = useState(false);
  const [imgCnt, setImgCnt] = useState(2);
  const [orderDetailId, setOrderDetailId] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [allUploaded, setAllUploaded] = useState([false]);
  const [itemList, setItemList] = useState([]);

  const [modes, setModes] = useState([]);

  const getList = async () => {
    const result = await getOrderRequest(orderNum);
    if (result?.data) {
      setOrderInfo(result?.data);
      setCurrentState(result?.data?.state);
      setRealState(result?.data?.state);
      if (result?.data?.orderType === 'DELIVERY') {
        setModes(['수락 대기중', '세탁중', '배달중', '배달 완료']);
      } else if (result?.data?.orderType === 'PICKUP') {
        setModes(['수락 대기중', '세탁중', '세탁 완료', '수거 완료']);
      }
      setOrderDetail(result?.data?.orderDetails);
      const items = [];
      for (let i = 0; i < result?.data?.orderDetails.length; i += 1) {
        items.push(result?.data?.orderDetails[i].name);
      }
      setItemList(items);
      if (result?.data?.state === 2 && result?.data?.orderType === 'PICKUP') {
        setAllUploaded([true]);
      } else {
        const temp = [];
        for (let i = 0; i < result?.data?.orderDetails?.length; i += 1) {
          if (
            result?.data?.state < 3 &&
            result?.data?.orderDetails[i]?.[
              `blockAddr${result?.data?.state + 1}ImgUrls`
            ]?.length === 0
          ) {
            temp.push(false);
          } else {
            temp.push(true);
          }
        }
        setAllUploaded(temp);
      }
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

  const handleClose = () => {
    setOpenImage(false);
  };

  const ImgUploadBtnClick = (value, index) => {
    setOpenImage(true);
    setOrderDetailId(value);
    if (index === -1) {
      setImgCnt(3);
    }
    setSelectedItem(index);
  };

  // 이미지 변경 로직
  const changeImageSrc = (value) => {
    if (imgCnt === 3) {
      const newArr1 = [...orderDetail];
      newArr1[0][`blockAddr${currentState + 1}ImgUrls`] = value;
      setOrderDetail(newArr1);
      setAllUploaded([true]);
    } else if (imgCnt === 2) {
      const newArr1 = [...orderDetail];
      newArr1[selectedItem][`blockAddr${currentState + 1}ImgUrls`] = value;
      setOrderDetail(newArr1);
      const newArr2 = [...allUploaded];
      newArr2[selectedItem] = true;
      setAllUploaded(newArr2);
    }
  };

  const nextState = async () => {
    const result = await changeState(orderNum);
    if (result?.data?.message === 'Success') {
      setCurrentState(result?.data?.state);
      if (currentState === 1 && orderInfo.orderType === 'PICKUP') {
        setAllUploaded([true]);
      } else {
        const temp = [];
        for (let i = 0; i < orderDetail.length; i += 1) {
          temp.push(false);
        }
        setAllUploaded(temp);
      }
      setRealState(result?.data?.state);
    } else {
      navigate('/error');
    }
  };

  const handleState = (value) => {
    setCurrentState(value);
  };

  console.log(orderInfo);

  return (
    <div className="order-detail">
      <div className="order-detail-header">
        <div className="order-detail-header-text">주문 상세 보기</div>
      </div>
      <div className="order-detail-info">
        <CardMedia
          image="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry0.png"
          className="order-detail-info-img"
        />
        <CardContent className="order-detail-info-content-middle">
          <div className="order-detail-info-content-orderId">
            [주문 번호 : {orderInfo.orderId}]
          </div>
          <div className="order-detail-info-content-userNickName">
            주문자 : {orderInfo.userNickName}
          </div>
          <div className="order-detail-info-content-orderId">
            주문 시간 : {orderInfo?.date?.slice(0, 19)}
          </div>
          {orderInfo.orderType === 'DELIVERY' ? (
            <div className="order-detail-info-content-addr">
              배달 주소 : {orderInfo.userAddr} {orderInfo.userAddrDetail}
            </div>
          ) : (
            <></>
          )}
          <div className="order-detail-info-items">
            <div>주문 항목 : {itemList.join(', ')}</div>
          </div>
        </CardContent>
        <CardContent className="order-detail-info-content-right">
          {orderInfo.orderType === 'DELIVERY' ? (
            <Chip
              className="order-detail-info-content-chip"
              label="배달"
              size="x-large"
              color="color1"
              variant="outlined"
            />
          ) : (
            <Chip
              className="order-detail-info-content-chip"
              label="수거"
              size="x-large"
              color="color1"
              variant="outlined"
            />
          )}
          <div className="order-detail-info-content-total">
            총 주문 금액 : {orderInfo.totalPrice} 클린
          </div>
        </CardContent>
      </div>
      <div className="order-detail-state">
        <Stepper activeStep={currentState} className="order-detail-state-steps">
          {modes.map((mode) => (
            <Step key={mode}>
              <StepLabel>{mode}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {currentState < 3 ? (
          <>
            <div className="order-detail-state-steps-buttons">
              <Button
                variant="contained"
                color="color2"
                onClick={() => handleState(currentState - 1)}
                disabled={currentState === 0}>
                이전 단계
              </Button>
              <Button
                variant="contained"
                color="color2"
                onClick={nextState}
                disabled={
                  realState !== currentState || allUploaded.includes(false)
                }>
                저장 후 다음 단계
              </Button>
              <Button
                variant="contained"
                color="color2"
                onClick={() => handleState(currentState + 1)}
                disabled={currentState === 3}>
                다음 단계
              </Button>
            </div>
            {orderInfo?.orderType === 'PICKUP' && currentState === 2 ? (
              <div className="order-detail-state-steps-warn">
                고객이 수거 완료 시 버튼을 눌러주세요.
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="order-detail-state-steps-buttons">
              <Button
                variant="contained"
                color="color2"
                onClick={() => handleState(currentState - 1)}
                disabled={currentState === 0}>
                이전 단계
              </Button>
              <Button
                variant="contained"
                color="color2"
                onClick={() => handleState(currentState + 1)}
                disabled={currentState === 3}>
                다음 단계
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="order-detail-upload">
        {currentState < 2 ? (
          <>
            {orderDetail.map((order, idx1) => (
              <div key={idx1} className="order-detail-upload-item">
                <div className="order-detail-upload-text">{order.name}</div>
                <div className="order-detail-upload-info">
                  <>
                    {order[`blockAddr${currentState + 1}ImgUrls`].length ===
                    0 ? (
                      <div className="order-detail-upload-img">
                        사진을 업로드 해주세요.
                      </div>
                    ) : (
                      <>
                        {order[`blockAddr${currentState + 1}ImgUrls`].map(
                          (url: any, idx2: any) => (
                            <img
                              src={`http://j7a706.p.ssafy.io/ipfs/${url}`}
                              key={`img-${idx2}`}
                              alt={`img-${idx2}`}
                              className="order-detail-upload-img"
                            />
                          )
                        )}
                      </>
                    )}
                  </>
                </div>
                <div className="order-detail-upload-button">
                  <Button
                    variant="contained"
                    color="color2"
                    onClick={() => ImgUploadBtnClick(order.orderDetailId, idx1)}
                    disabled={
                      order[`blockAddr${currentState + 1}ImgUrls`].length !==
                        0 || realState !== currentState
                    }>
                    사진 업로드
                  </Button>
                </div>
              </div>
            ))}
          </>
        ) : currentState === 2 && orderInfo?.orderType === 'DELIVERY' ? (
          <div className="order-detail-upload-item">
            <div className="order-detail-upload-text">배달 완료 사진</div>
            <div className="order-detail-upload-info">
              <>
                {orderDetail[0][`blockAddr${currentState + 1}ImgUrls`]
                  .length === 0 ? (
                  <div className="order-detail-upload-img">
                    사진을 업로드 해주세요.
                  </div>
                ) : (
                  <>
                    {orderDetail[0][`blockAddr${currentState + 1}ImgUrls`].map(
                      (url: any, idx3: any) => (
                        <img
                          src={`http://j7a706.p.ssafy.io/ipfs/${url}`}
                          key={`img-${idx3}`}
                          alt={`img-${idx3}`}
                          className="order-detail-upload-img"
                        />
                      )
                    )}
                  </>
                )}
              </>
            </div>
            <div className="order-detail-upload-button">
              <Button
                variant="contained"
                color="color2"
                onClick={() => ImgUploadBtnClick(orderNum, -1)}
                disabled={
                  orderDetail[0][`blockAddr${currentState + 1}ImgUrls`]
                    .length !== 0 || realState !== currentState
                }>
                사진 업로드
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
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
