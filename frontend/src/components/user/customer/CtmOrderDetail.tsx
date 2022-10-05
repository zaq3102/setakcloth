import {
  Button,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Step,
  StepLabel,
  Stepper,
  TextField
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getOrderRequest,
  registReview
} from '../../../store/actions/services/orderService';

const CtmOrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [currentState, setCurrentState] = useState(4);
  const [realState, setRealState] = useState(4);
  const [modes, setModes] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [itemList, setItemList] = useState([]);

  // 리뷰 관련
  const [writable, setWritable] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');

  const getOrder = async () => {
    const result = await getOrderRequest(orderId);
    if (result?.data) {
      const data = result?.data;
      setOrderInfo(data);
      setCurrentState(data?.state);
      setRealState(data?.state);
      setWritable(
        data?.state === 3 && !data.reviewContent && !data.reviewScore
      );
      if (data?.orderType === 'DELIVERY') {
        setModes(['수락 대기중', '세탁중', '배달중', '배달 완료']);
      } else if (result?.data?.orderType === 'PICKUP') {
        setModes(['수락 대기중', '세탁중', '세탁 완료', '수거 완료']);
      }
      setOrderDetail(data?.orderDetails);
      const items = [];
      for (let i = 0; i < data?.orderDetails.length; i += 1) {
        items.push(data?.orderDetails[i].name);
      }
      setItemList(items);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleState = (value) => {
    setCurrentState(value);
  };

  // 리뷰 관련 함수
  const handleOpen = () => {
    setOpenReview(true);
  };

  const handleClose = () => {
    setOpenReview(false);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const saveReview = async () => {
    const data = {
      score,
      content,
      isImg: false
    };
    const result = await registReview(orderId, data);
    if (result?.data?.message === 'Created') {
      alert('리뷰 등록 완료');
      handleClose();
      setScore(0);
      setContent('');
      setWritable(false);
    } else {
      navigate('/error');
    }
  };

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
          <div className="order-detail-info-content-state">
            현재 주문 상태 : {modes[realState]}
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
          {writable ? (
            <div>
              <Button
                type="button"
                onClick={handleOpen}
                color="color2"
                variant="outlined">
                리뷰 쓰기
              </Button>
            </div>
          ) : (
            <></>
          )}
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
                onClick={() => handleState(currentState + 1)}
                disabled={currentState === 3}>
                다음 단계
              </Button>
            </div>
            {orderInfo?.orderType === 'PICKUP' &&
            realState === 2 &&
            realState === currentState ? (
              <div className="order-detail-state-steps-warn">
                세탁이 완료 되었습니다. 세탁소를 방문하여 수거를 해주세요.
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
                        아직 사진이 업로드 되지 않았습니다.
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
                    아직 사진이 업로드 되지 않았습니다.
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
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 모달창 모음집 */}
      <Dialog open={openReview} onClose={handleClose}>
        <DialogTitle>리뷰 작성하기</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Rating
              value={score}
              precision={0.5}
              size="large"
              onChange={(event, rate) => {
                setScore(rate);
              }}
            />
          </Stack>
          <TextField
            autoFocus
            margin="dense"
            label="리뷰를 작성해주세요."
            value={content}
            onChange={handleContent}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={saveReview}>등록하기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CtmOrderDetail;
