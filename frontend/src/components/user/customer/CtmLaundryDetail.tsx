import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Pagination,
  Rating,
  TextField,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../../../styles/Customer.scss';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import StarIcon from '@mui/icons-material/Star';

const CtmLaundryDetail: React.FC = () => {
  const itemData = [
    {
      img: '/assets/laundry1.jpg',
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

  const value = 3.5;
  const [pageReview, setPageReview] = useState(1);
  const labels: { [index: string]: string } = {
    0.5: '0.5점',
    1: '1점',
    1.5: '1.5점',
    2: '2점',
    2.5: '2.5점',
    3: '3점',
    3.5: '3.5점',
    4: '4점',
    4.5: '4.5점',
    5: '5점'
  };
  const myReviewList = ['리뷰 1', '리뷰 2', '리뷰 3', '리뷰 4', '리뷰 5'];
  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  let content = <div>{orderInfo}</div>;
  if (mode === 1) {
    content = <div>{orderInfo}</div>;
  } else if (mode === 2) {
    content = (
      <div>
        <div>{reviewList}</div>
        <div>
          <Rating
            name="text-feedback"
            value={value}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Box>{labels[value]}</Box>
        </div>
        <br />
        <Typography variant="h4" component="div">
          리뷰 {myReviewList.length}개
        </Typography>
        <div className="laundry-review-list-content">
          <div className="laundry-review-detail">
            {myReviewList
              .slice((pageReview - 1) * 3, pageReview * 3)
              .map((review) => (
                <Link key={review} to="/">
                  <div className="laundry-review">{review}</div>
                </Link>
              ))}
          </div>
          <div className="laundry-pagination">
            <Pagination
              count={Math.ceil(myReviewList.length / 3)}
              page={pageReview}
              color="color2"
              className={`${
                myReviewList.length === 0
                  ? 'laundry-no-pagination'
                  : 'laundry-pagination'
              }`}
              onChange={pageReviewChange}
            />
          </div>
        </div>
      </div>
    );
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
          <Button className="orderinfo-button" onClick={() => handleTab(1)}>
            주문
          </Button>
          <Button className="reviewlist-button" onClick={() => handleTab(2)}>
            리뷰
          </Button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
export default CtmLaundryDetail;
