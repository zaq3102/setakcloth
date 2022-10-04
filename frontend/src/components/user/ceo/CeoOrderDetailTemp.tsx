import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UploadPhoto from '../../../components/common/UploadPhoto';
import {
  getFromAddrRequest,
  getOrderRequest
} from '../../../store/actions/services/orderService';
import { InfoRequest } from '../../../store/actions/services/userService';
import '../../../styles/Temp.scss';

const CeoOrderDetailTemp = () => {
  const navigate = useNavigate();
  const ImageShow = useRef<HTMLDivElement>();
  const ImageInput = useRef<HTMLInputElement>();
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

  const onImgInputBtnClick = (event) => {
    event.preventDefault();
    ImageInput.current.click();
  };

  const handleImgInput = (event) => {
    const imgList = event?.target?.files;
    setImageList(imgList);
    // for (let i = 0; i < imgList.length; i += 1) {
    //   const photo = document.createElement('img');
    //   photo.src = URL.createObjectURL(imgList[i]);
    //   photo.height = 280;
    //   photo.className = 'ceo-photo';
    //   ImageShow.current.appendChild(photo);
    // }
  };

  // const imageUpload = () => {
  //   for (let index = 0; index < imageList.length; index += 1) {
  //     const src = URL.createObjectURL(imageList[index]);
  //     console.log(src);
  //   }
  // };

  const handleClose = () => {
    setOpenImage(false);
  };

  const ImgUploadBtnClick = (value) => {
    setOpenImage(true);
    setOrderDetailId(value);
  };

  // 이미지 변경 로직
  const changeImageSrc = (value) => {
    setImgSrc(value);
  };

  return (
    <div className="ceo-order-detail">
      <div className="ceo-order-detail-info">정보</div>
      <div className="ceo-order-detail-state">
        <Stepper activeStep={currentState}>
          {modes.map((mode) => (
            <Step key={mode}>
              <StepLabel>{mode}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="ceo-order-detail-upload">
        {orderDetail.map((order, idx) => (
          <Card>
            <CardHeader>{order.name}</CardHeader>
            {/* <CardContent>
              <img
                src="../../assets/laundry1.png"
                alt="img-1"
                style={{ width: 10 }}
              />
            </CardContent> */}
            <Button
              variant="contained"
              color="color2"
              className="ctm-my-page-btn"
              onClick={() => ImgUploadBtnClick(order.orderDetailId)}>
              사진 업로드
            </Button>
            {/* <Button variant="contained" color="color1" onClick={imageUpload}>
              저장
            </Button> */}
          </Card>
        ))}
      </div>

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

export default CeoOrderDetailTemp;
