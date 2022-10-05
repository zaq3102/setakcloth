import { Card, CardContent, CardMedia, Chip } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { myorderCtmRequest } from '../../../store/actions/services/orderService';

const CtmOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [mode, setMode] = useState(1);
  const [modeState, setModeState] = useState(-1);
  const stateText = ['수락 대기중', '세탁중', '배달중', '세탁 완료'];

  const handleModeState = (value) => {
    setModeState(value);
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
    getMyOrders();
  }, []);

  let content = '';
  let orderTempList = orderList;
  if (modeState === 0) {
    orderTempList = orderList.filter((order) => order.state === 0);
  } else if (modeState === 1) {
    orderTempList = orderList.filter((order) => order.state === 1);
  } else if (modeState === 2) {
    orderTempList = orderList.filter((order) => order.state >= 2);
  }
  content = (
    <>
      {orderTempList.map((order) => (
        <Card
          sx={{ boxShadow: 0, borderRadius: 5 }}
          className="ctm-orderlist-card">
          <Link to={`../order/${order.orderId}`} key={order.orderId}>
            <div className="ctm-orderlist-card-content">
              <div className="ctm-orderlist-card-img">
                <CardMedia
                  component="img"
                  image="../assets/laundry1.png"
                  alt="img"
                />
              </div>
              <CardContent sx={{ p: 0 }} className="ctm-orderlist-card-info">
                <div>주문 상태 : {stateText[order.state]}</div>
                <div>주문 세탁소 : {order.laundryName}</div>
                <div>총 주문 금액 : {order.totalPrice}</div>
                <div>수령 방법 : {order.orderType}</div>
              </CardContent>
            </div>
          </Link>
        </Card>
      ))}
    </>
  );

  return (
    <div className="ctm-orderlist">
      <div className="ctm-orderlist-chips">
        <Chip
          className="ctm-orderlist-chip"
          label="전체"
          color="color4"
          onClick={() => handleModeState(-1)}
        />
        <Chip
          className="ctm-orderlist-chip"
          label="수락 대기중"
          color="color4"
          onClick={() => handleModeState(0)}
        />
        <Chip
          className="ctm-orderlist-chip"
          label="세탁중"
          color="color4"
          onClick={() => handleModeState(1)}
        />
        <Chip
          className="ctm-orderlist-chip"
          label="완료"
          color="color4"
          onClick={() => handleModeState(2)}
        />
      </div>
      <div>{content}</div>
    </div>
  );
};
export default CtmOrderList;
