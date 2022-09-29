import { Card, CardMedia } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getOrderRequest } from '../../../store/actions/services/orderService';
import SlideOrderBefore from '../../common/SlideOrderBefore';
import SlideOrderAfter from '../../common/SlideOrderAfter';
import '../../../styles/Customer.scss';

const CtmOrderDetail: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const getOrder = async () => {
    const result = await getOrderRequest(orderId);
    if (result?.data) {
      setOrder(result?.data);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getOrder();
  });

  return (
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
  );
};
export default CtmOrderDetail;
