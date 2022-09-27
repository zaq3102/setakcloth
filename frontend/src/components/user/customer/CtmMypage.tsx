import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination
} from '@mui/material';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import user from 'src/store/reducers/user';
import { InfoRequest } from '../../../store/actions/services/userService';
import '../../../styles/Customer.scss';

const CtmMypage: React.FC = () => {
  const [clean, setClean] = useState<number>(12340000000000);
  const [point, setPoint] = useState<number>(12340);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [pageReview, setPageReview] = useState(1);
  const [pageOrder, setPageOrder] = useState(1);
  const [userInfo, setUserInfo] = useState('');
  // const [profile, setProfile] = useState({ profileImg: '' });
  const ImageInput = useRef<HTMLInputElement>();
  const ImageShow = useRef<HTMLImageElement>();

  const getMypage = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setUserInfo(result?.data?.userInfo);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getMypage();
  }, []);

  const myReviewList = [
    '리뷰 1입니다~~~~~',
    '리뷰 2입니다~~~~~',
    '리뷰 3입니다~~~~~',
    '리뷰 4입니다~~~~~',
    '리뷰 5입니다~~~~~',
    '리뷰 6입니다~~~~~',
    '리뷰 7입니다~~~~~',
    '리뷰 8입니다~~~~~',
    '리뷰 9입니다~~~~~',
    '리뷰 10입니다~~~~~',
    '리뷰 11입니다~~~~~'
  ];

  const myOrderList = [
    {
      orderId: 1,
      laundryName: '크린토피아 역삼점',
      orderItems: ['신발', '모자']
    },
    {
      orderId: 2,
      laundryName: '크린토피아 역삼점',
      orderItems: ['신발', '모자']
    },
    {
      orderId: 3,
      laundryName: '크린토피아 역삼점',
      orderItems: ['신발', '모자']
    },
    {
      orderId: 4,
      laundryName: '크린토피아 역삼점',
      orderItems: ['신발', '모자']
    },
    {
      orderId: 5,
      laundryName: '크린토피아 역삼점',
      orderItems: ['신발', '모자']
    }
  ];

  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  const pageOrderChange = (event, value) => {
    setPageOrder(value);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 1) {
      setOpenModal1(true);
    } else if (modalType === 2) {
      setOpenModal2(true);
    }
  };

  const handleClose = (modalType) => {
    if (modalType === 1) {
      setOpenModal1(false);
    } else if (modalType === 2) {
      setOpenModal2(false);
    }
  };

  const handleSetProfile = () => {};

  const onImgInputBtnClick = (event) => {
    event.preventDefault();
    ImageInput.current.click();
  };

  const handleImgInput = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      if (file.size > 1400000) {
        alert('1MB 이하의 파일만 등록할 수 있습니다.');
        return;
      }
      const img = new Image();
      img.onerror = () => {
        alert('올바르지 않은 파일 형식입니다.');
        // ProfileNow();
      };
      img.src = URL.createObjectURL(file);
      ImageShow.current.src = img.src;
      // setSelectedFile(file);
    }
  };

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  return (
    <div className="ctm-my-page">
      <div className="ctm-my-page-left">
        <div className="ctm-my-info">
          <div className="ctm-my-info-title">내 정보</div>
          <div className="ctm-my-info-content">
            <div className="ctm-my-info-content-left">
              <img src="../assets/logo.png" alt="profileImg" width={100} />
              <Button
                variant="contained"
                color="color2"
                className="ctm-my-page-btn"
                onClick={() => handleOpenModal(2)}>
                사진 변경하기
              </Button>
            </div>
            <div className="ctm-my-info-content-right">
              <div>
                {Boolean(userInfo.nickName) ? userInfo.nickName : '사용자'}님,
                오늘도 화이팅!
              </div>
              <br />
              <div>
                주소 : {userInfo.addr} {userInfo.addrDetail}
              </div>
              <br />
              <div>(클린 아이콘 들어갈 예정) {clean} 클린</div>
              <div>(포인트 아이콘 들어갈 예정) {point} 포인트</div>
              <button
                type="button"
                className="ctm-my-page-btn"
                onClick={() => handleOpenModal(1)}>
                충전
              </button>
            </div>
          </div>
          <Dialog open={openModal1} onClose={() => handleClose(1)}>
            <div className="ctm-item-modal">
              <DialogTitle>클린 충전하기</DialogTitle>
              <DialogContent>
                <div>클린 충전 내용</div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(1)} color="color2">
                  취소
                </Button>
                <Button
                  // onClick={handleRegistLaundry}
                  variant="contained"
                  color="color2">
                  충전하기
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <Dialog open={openModal2} onClose={() => handleClose(2)}>
            <DialogTitle>프로필 이미지 업로드</DialogTitle>
            <DialogContent>
              1MB 미만의 파일만 등록할 수 있습니다. (jpg, jpeg, gif, png)
              <br />
              <br />
              <p>프로필 이미지 업로드 (선택)</p>
              <div className="ctm-signup-profile">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImgInput(event)}
                  style={{ display: 'none' }}
                  id="profileUploadBtn"
                  ref={ImageInput}
                />
                <Button
                  variant="contained"
                  color="color2"
                  onClick={onImgInputBtnClick}>
                  사진 업로드
                </Button>
                <br />
                <img
                  src="../assets/logo.png"
                  alt="profile-img"
                  ref={ImageShow}
                  width="100"
                />
                <br />
                ※미풍양속을 저해하는 저속, 음란한 내용의 그림 등록시 경고없이
                삭제될 수 있습니다.
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(2)} sx={{ color: 'black' }}>
                취소
              </Button>
              <Button onClick={handleSetProfile}>등록</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="ctm-my-review-list">
          <div className="ctm-my-review-list-title">내가 쓴 세탁소 리뷰</div>
          <div>총 {myReviewList.length}개의 리뷰를 작성하였습니다.</div>
          <div className="ctm-my-review-list-content">
            <div className="ctm-my-review-detail">
              {myReviewList
                .slice((pageReview - 1) * 3, pageReview * 3)
                .map((review) => (
                  <Link key={review} to="/ceo/mypage">
                    <div className="ctm-my-review">{review}</div>
                  </Link>
                ))}
            </div>
            <div className="ctm-pagination">
              <Pagination
                count={Math.ceil(myReviewList.length / 3)}
                page={pageReview}
                // variant="outlined"
                color="color2"
                className={`${
                  myReviewList.length === 0
                    ? 'ctm-no-pagination'
                    : 'ctm-pagination'
                }`}
                onChange={pageReviewChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ctm-my-order-list">
        <div className="ctm-my-order-list-title">나의 세탁 내역</div>
        <div>총 {myOrderList.length}번의 세탁을 하셨습니다.</div>
        <div className="ctm-my-order-list-content">
          <div className="ctm-my-order-detail">
            {myOrderList
              .slice((pageOrder - 1) * 4, pageOrder * 4)
              .map((order) => (
                <Link to={`../order/${order.orderId}`}>
                  <div className="ctm-my-order">
                    <div>{order.orderId}</div>
                    <div>{order.laundryName}</div>
                    <div>{order.orderItems}</div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="ctm-pagination">
            <Pagination
              count={Math.ceil(myOrderList.length / 4)}
              page={pageOrder}
              // variant="outlined"
              color="color2"
              className={`${
                myOrderList.length === 0
                  ? 'ctm-no-pagination'
                  : 'ctm-pagination'
              }`}
              onChange={pageOrderChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtmMypage;
