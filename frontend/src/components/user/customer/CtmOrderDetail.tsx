import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  getOrderRequest,
  registReview
} from '../../../store/actions/services/orderService';
import SlideOrderBefore from '../../common/SlideOrderBefore';
import SlideOrderAfter from '../../common/SlideOrderAfter';
import '../../../styles/Customer.scss';

const CtmOrderDetail: React.FC = () => {
  const [openReview, setOpenReview] = useState(false);
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [writable, setWritable] = useState(false);
  const navigate = useNavigate();

  const getOrder = async () => {
    const result = await getOrderRequest(orderId);
    if (result?.data) {
      const data = result?.data;
      setOrder(data);
      setWritable(
        ((data.orderType === 'DELIVERY' && data.state === 3) ||
          (data.orderType === 'PICKUP' && data.state === 2)) &&
          !data.reviewContent &&
          !data.reviewScore
      );
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

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
    <>
      <div className="order-detail">
        <Card sx={{ backgroundColor: `#E0EBF5` }} className="orderdetailcard">
          <div className="orderdetailcard-left">
            <CardMedia
              component="img"
              alt={order.laundryName}
              height="140"
              image={order.laundryLogo}
            />
            <br />
            <div className="orderdetail-status">배달 현황 : {order.state}</div>
          </div>
          <div className="orderdetailcard-right">
            주문 번호 : {order.orderId}
            세탁소 : {order.laundryName}
            주문 품목 : {order.orderItems}
            주문 품목 : {order.orderItems}
          </div>
        </Card>
        <div className="img-space">
          <br />
          세탁 전 <br />
          <div className="slide-space">
            <SlideOrderBefore />
          </div>
          <br />
          <br />
          세탁 후 <br />
          <div className="slide-space">
            <SlideOrderAfter />
          </div>
          <br />
          <br />
          배달 현황 <br />
          <img
            height="140"
            src={order.deliverimg}
            alt="배송이 아직 완료되지 않았습니다."
          />{' '}
        </div>
      </div>
      {writable ? (
        <button type="button" onClick={handleOpen}>
          리뷰 쓰기
        </button>
      ) : (
        <></>
      )}
      {/* 모달창 */}
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
    </>
  );
};
export default CtmOrderDetail;
