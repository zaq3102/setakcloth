import { Card, CardContent, CardMedia, Chip } from '@mui/material';
import { Box } from '@mui/system';
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
  const stateText = ['수락 대기중', '세탁중', '세탁완료', '완료'];

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
    orderTempList = orderList.filter((order) => order.state === 2);
  } else if (modeState === 3) {
    orderTempList = orderList.filter((order) => order.state === 3);
  }

  content = (
    <>
      {orderTempList.map((order) => (
        <Card
          sx={{
            boxShadow: '0 8px 15px -10px rgba(0,0,0,0.3)',
            borderRadius: 2
          }}
          className="ctm-orderlist-card">
          <Link to={`../order/${order.orderId}`} key={order.orderId}>
            <div className="ctm-orderlist-card-content">
              <div className="ctm-orderlist-card-img">
                {/* <Chip
                  label={stateText[order.state]}
                  variant="outlined"
                  size="small"
                  color="color1"
                /> */}
                <CardMedia
                  component="img"
                  image={
                    order.state == 0
                      ? 'https://setakcloth.s3.ap-northeast-2.amazonaws.com/dirty-clothes.png'
                      : order.state == 1
                      ? 'https://setakcloth.s3.ap-northeast-2.amazonaws.com/washing-machine.png'
                      : order.state == 2
                      ? 'https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry-basket.png'
                      : 'https://setakcloth.s3.ap-northeast-2.amazonaws.com/receipt.png'
                  }
                  alt="img"
                />
              </div>

              <CardContent
                sx={{ lineHeight: 1.5, fontSize: 'small', p: 0 }}
                className="ctm-orderlist-card-info">
                <Box
                  sx={{
                    // textAlign: 'center',
                    fontWeight: 'bold',
                    mt: 1,
                    mb: 1
                  }}>
                  {stateText[order.state]}
                </Box>
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
          label="세탁중"
          color="color4"
          onClick={() => handleModeState(1)}
        />
        <Chip
          className="ctm-orderlist-chip"
          label="세탁완료"
          color="color4"
          onClick={() => handleModeState(2)}
        />
        <Chip
          className="ctm-orderlist-chip"
          label="완료"
          color="color4"
          onClick={() => handleModeState(3)}
        />
      </div>
      <div>{content}</div>
    </div>
  );
};
export default CtmOrderList;
