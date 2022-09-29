import { Chip } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { myorderCeoRequest } from '../../../store/actions/services/orderService';

const CeoHome: React.FC = () => {
  const [state0, setState0] = useState([]);
  const [state1, setState1] = useState([]);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);

  // const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];
  const modes = [
    ['수락 대기중', state0],
    ['세탁중', state1],
    ['세탁 완료', state2],
    [' 배달중', state3]
  ];

  const [orderList, setOrderList] = useState([]);

  const laundryId = useSelector(
    (state) => state?.laundry?.laundryInfo[0]?.laundryId
  );

  const navigate = useNavigate();

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  const getList = async () => {
    const result = await myorderCeoRequest(laundryId);
    console.log(result);
    if (result?.data?.orders) {
      const list = result?.data?.orders;
      setOrderList(list);
      setState0(list.filter((order) => order.state === 0));
      setState1(list.filter((order) => order.state === 1));
      setState2(list.filter((order) => order.state === 2));
      setState3(list.filter((order) => order.state === 3));
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    if (laundryId) {
      getList();
    }
  }, []);

  return (
    <div>
      {laundryId ? (
        <div className="ceo-laundry-modes">
          {modes.map((mode) => (
            <div className="ceo-laundry-mode">
              <Chip label={mode[0]} color="color2" variant="outlined" />
              {mode[1].map((order) => (
                <div
                  key={order.orderId}
                  className="ceo-order-item"
                  onClick={() => onClickItem(order.orderId)}>
                  <div className="ceo-order-item-text">
                    [주문 번호: {order.orderId}]
                  </div>
                  <div className="ceo-order-item-text">
                    {order.date.substring(0, 19)}
                  </div>
                  <div className="ceo-order-item-text">
                    {order.userAddr} {order.userAddrDetail}
                  </div>
                  {order.orderType === 'DELIVERY' ? (
                    <Chip label="배달" color="color4" variant="contained" />
                  ) : (
                    <Chip label="수거" color="color3" variant="contained" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="ceo-home-not-regist">
          <div className="ceo-home-not-regist-text">
            세탁소를 등록해서 세탁클로쓰의 더 많은 서비스를 이용해보세요.
          </div>
          <Link to="./mypage" className="go-regist-button">
            <img
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry1.jpg"
              className="ceo-home-not-regist-img"
              alt="laundry-img"
            />
            <div className="ceo-home-not-regist-text">세탁소 등록하러 가기</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CeoHome;
