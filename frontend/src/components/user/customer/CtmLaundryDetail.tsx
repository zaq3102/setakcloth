import {
  Box,
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
import { useNavigate, useParams } from 'react-router-dom';
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
import '../../../styles/OrderButton.scss';
import {
  addLike,
  delLike,
  isLike,
  getBalance,
  balanceUpdate
} from '../../../store/actions/services/userService';

const CtmLaundryDetail: React.FC = () => {
  const [laundry, setLaundry] = useState([]);
  const [laundryItemList, setLaundryItemList] = useState([]);
  const { laundryId } = useParams();
  const [mode, setMode] = useState(1);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderType, setOrderType] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [reviewList, setReviewList] = useState([]);
  const [pageReview, setPageReview] = useState(1);
  const [heartClicked, setHeartClicked] = useState(false);
  const [mybalance, setBalance] = useState(0);
  const navigate = useNavigate();

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
      navigate('/error');
    }
  };

  const getLaundry = async () => {
    const result = await LaundryDetailRequest(laundryId);
    if (result?.data?.laundry) {
      setLaundry(result?.data?.laundry);
    } else {
      navigate('/error');
    }
  };
  const getMybalance = async () => {
    const result = await getBalance();
    if (result?.data?.statusCode === 200) {
      setBalance(result?.data?.balance);
    } else {
      navigate('/error');
    }
  };

  const getReviewList = async () => {
    const result = await LaundryReviewRequest(laundryId);
    if (result?.data?.message === 'Success') {
      setReviewList(result?.data?.reviews);
    } else {
      navigate('/error');
    }
  };

  const isHeartClicked = async () => {
    const result = await isLike({ laundryId });
    if (result?.data?.message === 'Create') {
      setHeartClicked(result?.data?.isFavorite);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getItemList();
    getLaundry();
    getReviewList();
    isHeartClicked();
    getMybalance();
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
    const DeliverType = parseInt(event.target.value, 10);
    if (DeliverType === 0) {
      setTotalPrice(totalPrice + laundry.deliverCost);
    } else if (DeliverType === 1) {
    }
    setOrderType(DeliverType);
  };

  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  const handleOrder = async () => {
    const orderCnts = {};
    if (totalPrice > mybalance) {
      alert('해당금액이 부족합니다.');
      navigate('../mypage');
      return;
    }
    for (let i = 0; i < laundryItemList.length; i += 1) {
      orderCnts[laundryItemList[i].id] = orderDetails[i];
    }
    const orderInfo = {
      laundryId: parseInt(laundryId, 10),
      orderType,
      totalPrice,
      orderDetails: orderCnts
    };
    const result = await orderRequest(orderInfo);
    if (result?.data?.message === 'Success') {
      const temp = [];
      for (let i = 0; i < orderDetails.length; i += 1) {
        temp.push(0);
      }
      setOrderDetails(temp);
      setTotalPrice(0);
      setOrderType(1);
    } else {
      navigate('/error');
    }
    const balance = mybalance - totalPrice;
    const balanceInfo = {
      balance
    };
    await balanceUpdate(balanceInfo);
  };

  let content = '';
  if (mode === 1) {
    content = (
      <>
        <Typography gutterBottom variant="h4" component="div">
          세탁 서비스 주문하기
        </Typography>
        {laundryItemList.map((item, idx) => (
          <div className="itemlist" key={item.id}>
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
            <FormControlLabel value={1} control={<Radio />} label="직접 수거" />
            <FormControlLabel value={0} control={<Radio />} label="배달" />
          </RadioGroup>
        </div>
        <div className="item-text">
          총 수량 : {orderDetails.reduce((a, b) => a + b, 0)}
        </div>
        <div className="item-text">예상 금액 : {totalPrice}원</div>
        <button
          className="order-button-button"
          type="button"
          disabled={totalPrice === 0}
          onClick={handleOrder}>
          <span>주문하기</span>
          <div className="order-button-cart">
            <svg viewBox="0 0 36 26">
              <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5" />
              <polyline points="15 13.5 17 15.5 22 10.5" />
            </svg>
          </div>
        </button>
      </>
    );
  } else if (mode === 2) {
    content = (
      <>
        <div className="rightdiv-top">
          <Rating
            name="text-feedback"
            value={laundry.score}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            size="large"
          />
          <Box>{laundry.score === -1 ? null : laundry.score}</Box>
          <Typography variant="h4" component="div">
            리뷰 {reviewList.length}개
          </Typography>
        </div>
        <div className="laundry-my-review-list">
          <div className="laundry-my-review-list-content">
            {reviewList
              .slice((pageReview - 1) * 3, pageReview * 3)
              .map((review) => (
                <div className="laundry-my-review">
                  <img
                    className="laundry-my-review-img"
                    src="../assets/user.png"
                    alt="user-img"
                  />
                  <div className="laundry-my-review-info">
                    <div className="laundry-my-review-nickname">
                      {review.userNickName ? review.userNickName : '익명'}
                    </div>
                    <div className="laundry-my-review-rate">
                      <Rating
                        value={review.score}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon />}
                        size="medium"
                      />
                    </div>
                  </div>
                  <div className="laundry-my-review-content">
                    {review.content}
                  </div>
                </div>
              ))}
          </div>
          <div className="laundry-pagination">
            <Pagination
              count={Math.ceil(reviewList.length / 3)}
              page={pageReview}
              // variant="outlined"
              color="color2"
              className={`${
                reviewList.length === 0 ? 'ctm-no-pagination' : 'ctm-pagination'
              }`}
              onChange={pageReviewChange}
            />
          </div>
        </div>
      </>
    );
  }

  document.querySelectorAll('.order-button-button').forEach((button) =>
    button.addEventListener('click', (e) => {
      if (!button.classList.contains('loading')) {
        button.classList.add('loading');
        setTimeout(() => button.classList.remove('loading'), 3700);
      }
      e.preventDefault();
    })
  );

  const handleHeart = async () => {
    if (heartClicked) {
      const result = await delLike({ laundryId });
      if (result?.data?.message === 'Create') {
        setHeartClicked(false);
      } else {
        navigate('/error');
      }
    } else {
      const result = await addLike({ laundryId });
      if (result?.data?.message === 'Success') {
        setHeartClicked(true);
      } else {
        navigate('/error');
      }
    }
  };

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
            <div
              className={
                'heart-animation' +
                ' ' +
                `${heartClicked ? 'heart-clicked' : null}`
              }
              onClick={handleHeart}
            />
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
      <div className="rightdiv">
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
