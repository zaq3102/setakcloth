import { Chip, ListItem, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { myorderCeoRequest } from '../../../store/actions/services/orderService';

const CeoHome: React.FC = () => {
  const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];
  const laundry1 = ['조미곤', '모자', '2022년 09월 20일', '직접 수거'];
  const [orderList, setOrderList] = useState([]);

  const laundryId = useSelector(
    (state) => state.laundry.laundryInfo[0].laundryId
  );
  const navigate = useNavigate();

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  const getList = async () => {
    const result = await myorderCeoRequest(laundryId);
    if (result?.data?.orders) {
      setOrderList(result?.data?.orders);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="ceo-laundry-modes">
      {modes.map((label) => (
        <div className="ceo-laundry-mode">
          <Chip label={label} color="color2" variant="outlined" />
          <ListItem key={label} className="ceo-order-item">
            <ListItemButton onClick={() => onClickItem('S1234')}>
              <ListItemText id={label} primary={laundry1} />
            </ListItemButton>
          </ListItem>
        </div>
      ))}
    </div>
  );
};

export default CeoHome;
