import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../../../styles/Customer.scss';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import GoogleMaps from '../../common/GoogleMaps';

const CtmLaundryDetail: React.FC = () => {
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소1',
      minimum: 15000,
      deliverfee: 3000,
      laundryinfo: '세탁소 정보',
      featured: true
    }
  ];

  const itemList = [
    {
      item: '셔츠',
      price: 1100,
      id: 1
    },
    {
      item: '바지',
      price: 1500,
      id: 2
    },
    {
      item: '자켓',
      price: 3000,
      id: 3
    },
    {
      item: '코트',
      price: 5000,
      id: 4
    }
  ];

  const [mode, setMode] = useState(1);
  const orderInfo = '주문 정보';
  const reviewList = '리뷰 정보';
  const [count, setCount] = useState([0]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < itemList.length; i += 1) {
      temp.push(0);
    }
    setCount(temp);
  }, []);

  const minusOne = (value) => {
    console.log('minus' + value);
    const temp = count;
    temp[value - 1] -= 1;
    setCount(temp);
  };
  const plusOne = (value) => {
    console.log('plus' + value);
    count[value - 1] += 1;
  };

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
                {item.laundryinfo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                최소 주문 금액: {item.minimum}원
              </Typography>
              <Typography variant="body2" color="text.secondary">
                수거 배달 비: {item.deliverfee}원
              </Typography>
            </CardContent>
            <GoogleMaps />
          </Card>
        ))}
        <br />
        <Card className="laundryitems">
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              세탁 서비스 신청{count}
            </Typography>
            {itemList.map((item) => (
              <div className="itemlist">
                <Typography variant="h4" component="div">
                  {item.item}
                </Typography>
                <Typography variant="h4" component="div">
                  {item.price}원
                </Typography>
                <IconButton onClick={() => minusOne(item.id)}>
                  <HorizontalRuleIcon />
                </IconButton>
                <TextField
                  className="laundrynum"
                  id="outlined-basic"
                  variant="outlined"
                  value={count[item.id - 1]}
                />
                <IconButton onClick={() => plusOne(item.id)}>
                  <AddIcon />
                </IconButton>
                <br />
              </div>
            ))}
            <br />
            <Typography gutterBottom variant="h4" component="div">
              총 수량 :{sum}
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              예상 금액 :
            </Typography>
          </CardContent>
        </Card>
        <Button>취소</Button>
        <Button>신청</Button>
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
