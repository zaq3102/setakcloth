import { Card, CardMedia } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import SlideOrderBefore from '../../common/SlideOrderBefore';
import SlideOrderAfter from '../../common/SlideOrderAfter';
import '../../../styles/Customer.scss';

const CtmOrderDetail: React.FC = () => {
  const { orderId } = useParams();

  const order = {
    laundryName: '크린토피아 역삼점',
    orderItems: ['신발', '모자'],
    state: '배달 완료',
    laundryLogo: '../../assets/laundry1.png',
    deliverimg: '../../assets/deliver.jpg'
  };

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
          주문 번호 : {orderId}
          <br />
          주문한 세탁소 : {order.laundryName}
          <br />
          주문 품목 : {order.orderItems}
        </div>
      </Card>
      <br />

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
