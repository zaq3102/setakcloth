import {
  Badge,
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
      Swal.fire({
        width: 200,
        icon: 'success',
        text: '리뷰 등록 완료'
      });
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
          <div className="order-detail-info-content-state-chip">
            <div className="order-detail-info-content-state">
              {modes[realState]}
            </div>
            <div>
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
            </div>
          </div>

          <div className="order-detail-info-content-orderTime">
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
        <CardContent>
          <div className="order-detail-info-content-right">
            <div className="order-detail-info-content-total-name">
              총 주문 금액 :
            </div>
            <span>&nbsp;</span>
            <div className="order-detail-info-content-total">
              {orderInfo.totalPrice} CLN
            </div>
          </div>
        </CardContent>
        <div className="order-detail-review-write">
          {writable ? (
            <Button
              type="button"
              onClick={handleOpen}
              color="color2"
              variant="outlined">
              리뷰 쓰기
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="order-detail-state">
        <Stepper activeStep={currentState} className="order-detail-state-steps">
          {modes.map((mode) => (
            <Step key={mode}>
              <StepLabel>{mode}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="order-detail-upload">
        {orderDetail.map((order, idx1) => (
          <div key={idx1} className="order-detail-upload-item">
            <div className="order-detail-upload-text">{order.name}</div>
            <Badge
              badgeContent={'세탁 전'}
              color="color3_2"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}>
              <div className="order-detail-upload-info">
                <>
                  {order[`blockAddr1ImgUrls`].length === 0 ? (
                    <div className="order-detail-upload-img">
                      세탁 전의 사진이 업로드 되지 않았습니다.
                    </div>
                  ) : (
                    <>
                      {order[`blockAddr1ImgUrls`].map(
                        (url1: any, idx21: any) => (
                          <img
                            src={`http://j7a706.p.ssafy.io/ipfs/${url1}`}
                            key={`img-${idx21}`}
                            alt={`img-${idx21}`}
                            className="order-detail-upload-img"
                          />
                        )
                      )}
                    </>
                  )}
                </>
              </div>
            </Badge>
            <Badge
              badgeContent={'세탁 후'}
              color="color3"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}>
              <div className="order-detail-upload-info">
                <>
                  {order[`blockAddr2ImgUrls`].length === 0 ? (
                    <div className="order-detail-upload-img">
                      세탁 후의 사진이 업로드 되지 않았습니다.
                    </div>
                  ) : (
                    <>
                      {order[`blockAddr2ImgUrls`].map(
                        (url2: any, idx22: any) => (
                          <img
                            src={`http://j7a706.p.ssafy.io/ipfs/${url2}`}
                            key={`img-${idx22}`}
                            alt={`img-${idx22}`}
                            className="order-detail-upload-img"
                          />
                        )
                      )}
                    </>
                  )}
                </>
              </div>
            </Badge>
          </div>
        ))}
        {orderInfo?.orderType === 'DELIVERY' ? (
          <div className="order-detail-upload-item">
            <div className="order-detail-upload-text">배달 완료 사진</div>
            <div className="order-detail-upload-info">
              <>
                {orderDetail[0][`blockAddr3ImgUrls`].length === 0 ? (
                  <div className="order-detail-upload-img">
                    아직 사진이 업로드 되지 않았습니다.
                  </div>
                ) : (
                  <>
                    {orderDetail[0][`blockAddr3ImgUrls`].map(
                      (url3: any, idx3: any) => (
                        <img
                          src={`http://j7a706.p.ssafy.io/ipfs/${url3}`}
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
            focused
            margin="dense"
            label="리뷰를 작성해주세요."
            value={content}
            onChange={handleContent}
            type="text"
            fullWidth
            variant="standard"
            placeholder="리뷰를 작성해주세요."
            inputProps={{
              maxLength: 100
            }}
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
