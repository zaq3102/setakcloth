import { Chip, ListItem, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';

const CeoHome: React.FC = () => {
  const modes = ['수락 대기중', '세탁중', '세탁 완료', '배달중'];
  const laundry1 = ['조미곤', '모자', '2022년 09월 20일', '직접 수거'];
  const navigate = useNavigate();

  const onClickItem = (value: string) => {
    navigate(`./${value}`);
  };

  return (
    <div className="laundry-modes">
      {modes.map((label) => (
        <div>
          <Chip label={label} color="color2" variant="outlined" />
          <ListItem key={label}>
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
