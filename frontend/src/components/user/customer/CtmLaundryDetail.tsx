import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import { useState } from 'react';
import '../../../styles/Customer.scss';

const CtmLaundryDetail: React.FC = () => {
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소1',
      minimum: 15000,
      deliverfee: 3000,
      featured: true
    }
  ];
  const [mode, setMode] = useState(1);
  const orderInfo = '주문 정보';
  const reviewList = '리뷰 정보';

  const handleTab = (value) => {
    setMode(value);
  };

  let content = <div>{orderInfo}</div>;
  if (mode === 1) {
    content = <div>{orderInfo}</div>;
  } else if (mode === 2) {
    content = <div>{reviewList}</div>;
  }

  return (
    <div className="customerlaundrydetail">
      <div id="leftdiv">
        {itemData.map((item) => (
          <Card className="laundrydetailcard" key={item.img}>
            <CardMedia
              component="img"
              height="200"
              image={`${item.img}`}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                세탁소 정보
              </Typography>
              <Typography variant="body2" color="text.secondary">
                최소 주문 금액: {item.minimum}원
              </Typography>
              <Typography variant="body2" color="text.secondary">
                수거 배달 비: {item.deliverfee}원
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* toggle */}
      <div id="rightdiv">
        <div>
          <Button onClick={() => handleTab(1)}>주문</Button>
          <Button onClick={() => handleTab(2)}>리뷰</Button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
export default CtmLaundryDetail;
