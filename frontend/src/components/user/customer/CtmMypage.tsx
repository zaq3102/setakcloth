import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/common/Loading';
import {
  myorderCtmRequest,
  myReviewRequest
} from '../../../store/actions/services/orderService';
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
  const [reviewList, setReviewList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [pending, setPending] = useState(false);
  // const [profile, setProfile] = useState({ profileImg: '' });
  const navigate = useNavigate();

  const getMypage = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setUserInfo(result?.data?.userInfo);
    } else {
      navigate('/error');
    }
  };

  const getMyReviews = async () => {
    const result = await myReviewRequest();
    if (result?.data?.reviews) {
      setReviewList(result?.data?.reviews);
    } else {
      navigate('/error');
    }
  };

  const getMyOrders = async () => {
    const result = await myorderCtmRequest();
    if (result?.data?.orders) {
      setOrderList(result?.data?.orders);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    setPending(true);
    getMypage();
    getMyReviews();
    getMyOrders();
    setTimeout(() => {
      setPending(false);
    }, 3000);
  }, []);

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

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  return (
    <div className="ctm-my-page">
      {pending ? (
        <Loading />
      ) : (
        <>
          <div className="ctm-my-page-left">
            <div className="ctm-my-info">
              <div className="ctm-my-info-title">내 정보</div>
              <div className="ctm-my-info-content">
                <div className="ctm-my-info-content-right">
                  <div>
                    {userInfo.nickName ? userInfo.nickName : '사용자'}님, 오늘도
                    화이팅!
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
            </div>
            <div className="ctm-my-review-list">
              <div className="ctm-my-review-list-title">
                내가 쓴 세탁소 리뷰
              </div>
              <div>총 {reviewList.length}개의 리뷰를 작성하였습니다.</div>
              <div className="ctm-my-review-list-content">
                <div className="ctm-my-review-detail">
                  {reviewList
                    .slice((pageReview - 1) * 3, pageReview * 3)
                    .map((review, idx) => (
                      <Link key={idx} to="/customer/mypage">
                        <div className="ctm-my-review">{review.content}</div>
                      </Link>
                    ))}
                </div>
                <div className="ctm-pagination">
                  <Pagination
                    count={Math.ceil(reviewList.length / 3)}
                    page={pageReview}
                    // variant="outlined"
                    color="color2"
                    className={`${
                      reviewList.length === 0
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
            <div>총 {orderList.length}번의 세탁을 하셨습니다.</div>
            <div className="ctm-my-order-list-content">
              <div className="ctm-my-order-detail">
                {orderList
                  .slice((pageOrder - 1) * 4, pageOrder * 4)
                  .map((order) => (
                    <Link to={`../order/${order.orderId}`} key={order.orderId}>
                      <div className="ctm-my-order">
                        <div>{order.orderId}</div>
                        <div>{order.laundryName}</div>
                        <div>{order.totalPrice}</div>
                        <div>{order.orderType}</div>
                        <div>{order.state}</div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="ctm-pagination">
                <Pagination
                  count={Math.ceil(orderList.length / 4)}
                  page={pageOrder}
                  // variant="outlined"
                  color="color2"
                  className={`${
                    orderList.length === 0
                      ? 'ctm-no-pagination'
                      : 'ctm-pagination'
                  }`}
                  onChange={pageOrderChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CtmMypage;
