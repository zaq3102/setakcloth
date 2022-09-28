import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  IconButton,
  Pagination,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useState, useEffect } from 'react';
import '../../../styles/Customer.scss';
import KakaoMaps from '../../common/KakaoMaps';
import {
  LaundryDetailRequest,
  LaundryReviewRequest,
  myLaundryItemsRequest
} from '../../../store/actions/services/laundryService';
import { orderRequest } from '../../../store/actions/services/orderService';

const CtmLaundryDetail: React.FC = () => {
  const [laundry, setLaundry] = useState([]);
  const [laundryItemList, setLaundryItemList] = useState([]);
  const { laundryId } = useParams();

  const [mode, setMode] = useState(1);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderType, setOrderType] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [reviewList, setReviewList] = useState([]);

  const getItemList = async () => {
    const result = await myLaundryItemsRequest(laundryId);
    if (result?.payload?.data?.laundryItems) {
      const items = result?.payload?.data?.laundryItems;
      setLaundryItemList(items);
      const temp = [];
      for (let i = 0; i < items.length; i += 1) {
        temp.push(0);
      }
      setOrderDetails(temp);
    } else {
      console.log('error');
    }
  };

  const getLaundry = async () => {
    const result = await LaundryDetailRequest(laundryId);
    if (result?.data?.laundry) {
      setLaundry(result?.data?.laundry);
    } else {
      console.log('error');
    }
  };

  const getReviewList = async () => {
    const result = await LaundryReviewRequest(laundryId);
    if (result?.data?.message === 'Success') {
      setReviewList(result?.data?.reviews);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getItemList();
    getLaundry();
    getReviewList();
  }, []);

  const minusOne = (index) => {
    const newArr = [...orderDetails];
    newArr[index] -= 1;
    setTotalPrice(totalPrice - laundryItemList[index].price);
    setOrderDetails(newArr);
  };

  const plusOne = (index) => {
    const newArr = [...orderDetails];
    newArr[index] += 1;
    setTotalPrice(totalPrice + laundryItemList[index].price);
    setOrderDetails(newArr);
  };

  const handleTab = (value) => {
    setMode(value);
  };

  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(parseInt(event.target.value, 10));
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

  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  const handleOrder = async () => {
    const orderInfo = {
      laundryId: parseInt(laundryId, 10),
      orderType,
      totalPrice,
      orderDetails
    };
    const result = await orderRequest(orderInfo);
    if (result?.data?.message === 'Success') {
      alert('주문이 완료 되었습니다.');
      const temp = [];
      for (let i = 0; i < orderDetails.length; i += 1) {
        temp.push(0);
      }
      setOrderDetails(temp);
      setTotalPrice(0);
    } else {
      console.log('error');
    }
  };

  let content = '';
  if (mode === 1) {
    content = (
      <>
        <Typography gutterBottom variant="h4" component="div">
          세탁 서비스 주문하기
        </Typography>
        {laundryItemList.map((item, idx) => (
          <div className="itemlist">
            <div className="item-text">
              {item.name} {item.price}원
            </div>
            <IconButton
              onClick={() => minusOne(idx)}
              disabled={orderDetails[idx] === 0}>
              <HorizontalRuleIcon />
            </IconButton>
            <TextField
              className="laundrynum"
              id="outlined-basic"
              variant="outlined"
              value={orderDetails[idx]}
            />
            <IconButton onClick={() => plusOne(idx)}>
              <AddIcon />
            </IconButton>
          </div>
        ))}
        <div className="order-isDeliver">
          <div>수령 방법</div>
          <RadioGroup row value={orderType} onChange={handleDeliver}>
            <FormControlLabel value={0} control={<Radio />} label="배달" />
            <FormControlLabel value={1} control={<Radio />} label="직접 수거" />
          </RadioGroup>
        </div>
        <div className="item-text">
          총 수량 : {orderDetails.reduce((a, b) => a + b, 0)}
        </div>
        <div className="item-text">예상 금액 : {totalPrice}원</div>
        <Button
          variant="contained"
          color="color2"
          onClick={handleOrder}
          disabled={totalPrice === 0}>
          주문하기
        </Button>
      </>
    );
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
        <Typography variant="h4" component="div">
          리뷰 {reviewList.length}개
        </Typography>
        <div className="laundry-review-list-content">
          <div className="laundry-review-detail">
            {reviewList
              .slice((pageReview - 1) * 3, pageReview * 3)
              .map((review) => (
                <Link key={review} to="/">
                  <div className="laundry-review">{review}</div>
                </Link>
              ))}
          </div>
          <div className="laundry-pagination">
            <Pagination
              count={Math.ceil(reviewList.length / 3)}
              page={pageReview}
              color="color2"
              className={`${
                reviewList.length === 0
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
        <Card className="laundrydetailcard">
          <CardMedia
            component="img"
            height="200"
            image="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry1.jpg"
            // image={`${item.img}`}
            alt={laundry.laundryName}
          />
          <CardContent id="laundryBox">
            <div className="item-title">{laundry.laundryName}</div>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <div className="item-content">
              <div>
                {laundry.addr} {laundry.addrDetail}
              </div>
              <div>최소 이용금액 : {laundry.minCost}원</div>
              <div>배달비 : {laundry.deliverCost}원</div>
            </div>
          </CardContent>
          <KakaoMaps />
        </Card>
      </div>

      {/* toggle */}
      <div id="rightdiv">
        <div className="rightdiv-button">
          <button
            type="button"
            className={`orderinfo-button ${
              mode === 1 ? 'button-selected' : null
            }`}
            onClick={() => handleTab(1)}>
            주문
          </button>
          <button
            type="button"
            className={`reviewlist-button ${
              mode === 2 ? 'button-selected' : null
            }`}
            onClick={() => handleTab(2)}>
            리뷰
          </button>
        </div>
        <div className="rightdiv-content">{content}</div>
      </div>
    </div>
  );
};
export default CtmLaundryDetail;
