import {
  Button,
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

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      const userInfo = result?.data?.userInfo;
      setMyaddress(`${userInfo.addr} ${userInfo.addrDetail}`);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getMyInfo();
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
      {/* 게시판 이동 버튼 5개(전체보기, 거리순, 별점순, 즐겨찾기) */}
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
          <div className="my-address-title">우리 집 {myaddress}</div>
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

      {/* 큰 버튼 4개 */}
      {/* <div className="list-buttons">
        <div className="list-buttons-down">
          <Button
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}
            onClick={() => handleButton(1)}>
            <img
              className="laundry-list-img"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/heart.png"
              alt="favourite laundry list"
            />
            <div className="button-tag-text">즐겨찾기 세탁소 목록</div>
          </Button>

          <Button
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}
            onClick={() => handleButton(2)}>
            <img
              className="laundry-list-img"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/clock.png"
              alt="recently used laundry list"
            />
            <div className="button-tag-text">별점 높은 세탁소 목록</div>
          </Button>
        </div>
        <div className="list-buttons-up">
          <Button
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}
            onClick={() => handleButton(3)}>
            <img
              className="laundry-list-img"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/map.png"
              alt="nearest laundry list"
            />{' '}
            <div className="button-tag-text"> 가까운 세탁소 목록</div>
          </Button>
          <Button
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}
            onClick={() => handleButton(4)}>
            <img
              className="laundry-list-img"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/star.png"
              alt="highest rate laundry list"
            />
            <div className="button-tag-text">최근 이용한 세탁소 목록</div>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default CtmHome;
