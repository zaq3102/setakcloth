import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DaumPostcode from 'react-daum-postcode';
import '../../../styles/Customer.scss';
import { LaundryLatestRequest } from '../../../store/actions/services/laundryService';
import {
  changeAddrRequest,
  getLocationxyRequest,
  InfoRequest
} from '../../../store/actions/services/userService';

declare global {
  interface Window {
    kakao?: any;
  }
}
const { kakao } = window;

const CtmHome: React.FC = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [myaddress, setMyaddress] = useState<string>('');
  const [addr, setAddr] = useState<string>('');
  const [addrDetail, setAddrDetail] = useState<string>('');
  const [latestLaundry, setLatestLaundry] = useState([]);

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      const userInfo = result?.data?.userInfo;
      setMyaddress(`${userInfo.addr} ${userInfo.addrDetail}`);
    } else {
      navigate('/error');
    }
  };

  const getLatestLaundry = async () => {
    const result = await LaundryLatestRequest();
    if (result?.data?.laundries) {
      setLatestLaundry(result?.data?.laundries);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getMyInfo();
    getLatestLaundry();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async () => {
    const result1 = await getLocationxyRequest(`${addr} ${addrDetail}`);
    if (result1?.data?.documents) {
      const addrInfo = {
        addr,
        addrLat: result1?.data?.documents[0].y,
        addrLng: result1?.data?.documents[0].x,
        addrDetail
      };
      const result2 = await changeAddrRequest(addrInfo);
      if (result2?.data) {
        setMyaddress(`${addr} ${addrDetail}`);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/error');
    }
    setOpen(false);
  };

  const handleButton = (mode) => {
    navigate('./laundrylist', { state: mode });
  };

  const handleComplete = async (data) => {
    setAddr(`${data.address} ${data.buildingName}`);
  };

  const addrDetailChange = (event) => {
    setAddrDetail(event.target.value);
  };

  return (
    <div>
      {/* 게시판 이동 버튼 5개(전체보기, 거리순, 별점순, 즐겨찾기, 최근 이용) */}
      <div className="tolist-Btn-Group">
        <a className="toListBtn" onClick={() => handleButton(0)}>
          전체보기
        </a>
        <a className="toListBtn" onClick={() => handleButton(1)}>
          거리순
        </a>
        <a className="toListBtn" onClick={() => handleButton(2)}>
          별점순
        </a>
        <a className="toListBtn" onClick={() => handleButton(3)}>
          즐겨찾기
        </a>
      </div>
      {/* 주소 */}
      <div className="ctm-home">
        <div className="ctm-address-area">
          <div className="my-address-title">
            <Chip color="color1" label="우리 집" variant="outlined" />
          </div>
          <div className="my-address-content">{myaddress}</div>
          <div className="address-modify-btn">
            <Button onClick={handleClickOpen}>
              <img
                className="modify-btn-img"
                src="./assets/pen.gif"
                alt="수정하기"
              />
            </Button>
          </div>
        </div>
        {/* 주소 변경 모달 창 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>주소 변경하기</DialogTitle>
          <DaumPostcode autoClose={false} onComplete={handleComplete} />
          <TextField
            id="outlined-basic"
            label="상세 주소 입력"
            variant="outlined"
            value={addrDetail}
            onChange={addrDetailChange}
          />
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleChange}>변경</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* 최신 세탁소 5개 리스트 */}
      <div>
        {latestLaundry.map((item) => (
          <Card
            key={item.laundryId}
            id="laundryCard"
            sx={{ padding: 1, margin: 1 }}
            onClick={() => onclicklaundry(item.laundryId)}>
            <CardMedia
              id="cardImg"
              component="img"
              image="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry1.png"
            />
            {/* image={item.imgUrl} /> */}
            <CardContent id="laundryBox">
              <div className="item-title">{item.laundryName}</div>
              <div className="item-content">
                <div>
                  {item.addr} {item.addrDetail}
                </div>
                <div>최소 이용금액 : {item.minCost}원</div>
                <div>배달비 : {item.deliveryCost}원</div>
                <div className="item-chips">
                  {item.deliver ? (
                    <Chip
                      label="배달"
                      size="small"
                      color="color2"
                      variant="outlined"
                    />
                  ) : null}
                  {item.pickup ? (
                    <Chip
                      label="수거"
                      size="small"
                      color="color3"
                      variant="outlined"
                    />
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CtmHome;
