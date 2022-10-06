import {
  Button,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Step,
  StepButton,
  Stepper,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UploadPhoto from '../../common/UploadPhoto';
import {
  changeState,
  getFromAddrRequest,
  getOrderRequest
} from '../../../store/actions/services/orderService';
import {
  balanceUpdate,
  InfoRequest
} from '../../../store/actions/services/userService';
import {
  getBalance,
  sendClean,
  unlockAccount
} from '../../../store/actions/services/walletService';
import Swal from 'sweetalert2';

const CeoOrderDetail = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState(4);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [realState, setRealState] = useState(4);
  const { orderNum } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [fromAddr, setFromAddr] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [imgCnt, setImgCnt] = useState(2);
  const [orderDetailId, setOrderDetailId] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [allUploaded, setAllUploaded] = useState([false]);
  const [itemList, setItemList] = useState([]);

  const [walletPassword, setWalletPassword] = useState('');

  // 모달창
  const [openImage, setOpenImage] = useState(false);
  const [openCheckPassword, setOpenCheckPassword] = useState(false);

  const [modes, setModes] = useState([]);

  const getList = async () => {
    const result = await getOrderRequest(orderNum);
    if (result?.data) {
      setOrderInfo(result?.data);
      setCurrentState(result?.data?.state);
      setRealState(result?.data?.state);
      const newCompleted = completed;
      for (let i = 0; i < result?.data?.state; i += 1) {
        newCompleted[i] = true;
      }
      setCompleted(newCompleted);
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
    if (currentState === 0) {
      const check = await unlockAccount(userInfo.wallet, walletPassword);
      if (!check) {
        Swal.fire({
          width: 200,
          icon: 'error',
          text: '비밀번호가 틀립니다'
        });
        setWalletPassword('');
        setOpenCheckPassword(false);
        return;
      }
      // 비밀번호 검증 여기 해줘야 됨
      const result = await sendClean(
        fromAddr.fromAddr1,
        userInfo.wallet,
        fromAddr.price
      );
      if (!result) {
        Swal.fire({
          width: 200,
          icon: 'error',
          text: '결제 오류 발생'
        });
        navigate('/error');
        return;
      }
      const balance = await getBalance(userInfo.wallet);
      if (!balance) {
        Swal.fire({
          width: 200,
          icon: 'error',
          text: '결제 오류 발생'
        });
        navigate('/error');
        return;
      }
      const balanceInfo = {
        balance
      };
      const DBbalance = await balanceUpdate(balanceInfo);

      if (!DBbalance) {
        Swal.fire({
          width: 200,
          icon: 'error',
          text: '결제 오류 발생'
        });
        navigate('/error');
        return;
      }
    }

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
      const newCompleted = completed;
      newCompleted[realState] = true;
      setCompleted(newCompleted);
      setRealState(result?.data?.state);
    } else {
      navigate('/error');
    }
  };

  const handleState = (value) => {
    setCurrentState(value);
  };

  const walletPasswordChange = (event) => {
    setWalletPassword(event.target.value.trim());
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
          <div className="order-detail-info-content-userNickName">
            주문자 : {orderInfo.userNickName}
          </div>
          <div className="order-detail-info-content-orderTime2">
            주문 시간 : {orderInfo?.date?.slice(0, 19)}
          </div>
          {orderInfo.orderType === 'DELIVERY' ? (
            <div className="order-detail-info-content-addr">
              배달 주소 : {orderInfo.userAddr} {orderInfo.userAddrDetail}
            </div>
          ) : (
            <></>
          )}
          <div className="order-detail-info-content-total-list">
            <div className="order-detail-info-content-total-name">
              주문 항목 :
            </div>
            <div className="order-detail-info-items">
              <div>{itemList.join(', ')}</div>
            </div>
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
          {/* <div className="order-detail-info-content-total">
            총 주문 금액 : {orderInfo.totalPrice} 클린
          </div> */}
          <div className="order-detail-info-content-total-list">
            <div className="order-detail-info-content-total-name">
              총 주문 금액 :
            </div>
            <span>&nbsp;</span>
            <div className="order-detail-info-content-total">
              {orderInfo.totalPrice} CLN
            </div>
          </div>
        </CardContent>
      </div>
      <div className="order-detail-state">
        <Stepper
          nonLinear
          activeStep={currentState}
          className="order-detail-state-steps">
          {modes.map((mode, index) => (
            <Step key={mode} completed={completed[index]}>
              <StepButton color="inherit" onClick={() => handleState(index)}>
                {mode}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {currentState < 3 ? (
          <>
            <div className="order-detail-state-steps-buttons">
              {realState === 0 ? (
                <Button
                  variant="contained"
                  color="color2_2"
                  onClick={() => setOpenCheckPassword(true)}
                  disabled={
                    realState !== currentState || allUploaded.includes(false)
                  }>
                  저장 후 다음 단계
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="color2_2"
                  onClick={nextState}
                  disabled={
                    realState !== currentState || allUploaded.includes(false)
                  }>
                  저장 후 다음 단계
                </Button>
              )}
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
          <div className="order-detail-state-steps-warn">
            모든 과정이 완료되었습니다.
          </div>
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
                    color="color2_2"
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
                color="color2_2"
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
      <Dialog open={openImage} onClose={() => setOpenImage(false)}>
        <UploadPhoto
          changeImageSrc={changeImageSrc}
          handleClose={() => setOpenImage(false)}
          imgCnt={imgCnt}
          id={orderDetailId}
        />
      </Dialog>

      {/* 비밀번호 확인 모달 */}
      <Dialog
        open={openCheckPassword}
        onClose={() => setOpenCheckPassword(false)}>
        <DialogTitle sx={{ fontSize: 'large', fontWeight: 'bold' }}>
          지갑 비밀번호 확인
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 'medium' }}>
            지갑 비밀번호를 입력해주세요.
          </DialogContentText>
          <TextField
            sx={{ mt: 2, mb: 1, bgcolor: '#F4FCFD' }}
            variant="filled"
            color="color1"
            autoFocus
            label="지갑 비밀번호"
            value={walletPassword}
            onChange={walletPasswordChange}
            type="password"
            fullWidth
            variant="standard"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                nextState();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCheckPassword(false)}
            color="color1"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            취소
          </Button>
          <Button
            onClick={nextState}
            color="color1"
            variant="contained"
            sx={{ fontSize: 'small', fontWeight: 'bold' }}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CeoOrderDetail;
