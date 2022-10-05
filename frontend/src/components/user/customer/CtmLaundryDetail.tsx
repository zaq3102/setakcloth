import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  IconButton,
  Pagination,
  Radio,
  RadioGroup,
  Rating,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from '@mui/icons-material/Add';
import '../../../styles/Customer.scss';
import '../../../styles/OrderButton.scss';
import KakaoMaps from '../../common/KakaoMaps';
import {
  LaundryReviewRequest,
  orderRequest
} from '../../../store/actions/services/orderService';
import {
  LaundryDetailRequest,
  myLaundryItemsRequest
} from '../../../store/actions/services/laundryService';
import {
  addLike,
  delLike,
  isLike,
  getBalance,
  balanceUpdate
} from '../../../store/actions/services/userService';

const CtmLaundryDetailTemp = () => {
  const [laundry, setLaundry] = useState([]);
  const [laundryItemList, setLaundryItemList] = useState([]);
  const { laundryId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderType, setOrderType] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [reviewList, setReviewList] = useState([]);
  const [pageReview, setPageReview] = useState(1);
  const [heartClicked, setHeartClicked] = useState(false);
  const [mybalance, setBalance] = useState(0);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

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

  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    const DeliverType = parseInt(event.target.value, 10);
    if (DeliverType === 0) {
      setTotalPrice(totalPrice + laundry.deliverCost);
    } else if (DeliverType === 1) {
      setTotalPrice(totalPrice - laundry.deliverCost);
    }
    setOrderType(DeliverType);
  };

  const pageReviewChange = (event, value) => {
    setPageReview(value);
  };

  const handleOrder = async () => {
    const orderCnts = {};
    if (totalPrice > mybalance) {
      alert('잔액이 부족하여 주문이 불가합니다.');
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

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  function a11yProps(index: number) {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  document.querySelectorAll('.order-button-button').forEach((button) =>
    button.addEventListener('click', (e) => {
      if (!button.classList.contains('loading')) {
        button.classList.add('loading');
        setTimeout(() => button.classList.remove('loading'), 3700);
      }
      e.preventDefault();
    })
  );

  return (
    <div className="ctm-laundry-detail">
      <img className="ctm-laundry-img" src={laundry.imgUrl} alt="laundry-img" />
      <div className="ctm-laundry-card">
        <Card>
          <CardContent
            sx={{ width: 1, height: 1, paddingRight: 3, paddingLeft: 5 }}>
            <Chip
              className="ctm-laundry-chip"
              size="small"
              label="배달"
              variant="outlined"
              color="color1"
            />
            <Chip
              className="ctm-laundry-chip"
              size="small"
              label="수거"
              variant="outlined"
            />
            <div className="ctm-laundry-title-space">
              <div>
                <div className="ctm-laundry-title">
                  <div>{laundry.laundryName}</div>
                </div>
                <div className="ctm-laundry-addr">
                  {`${laundry.addr} `}
                  {laundry.addrDetail}
                </div>
                <div className="ctm-laundry-num">{laundry.contact}</div>
              </div>
              <div className="ctm-laundry-heart">
                <div
                  className={
                    'heart-animation' +
                    ' ' +
                    `${heartClicked ? 'heart-clicked' : null}`
                  }
                  onClick={handleHeart}
                />
              </div>
            </div>

            <br />
            <br />
            <div className="ctm-laundry-mincost">
              최소 주문 금액 : {laundry.minCost} 원
            </div>
            <div className="ctm-laundry-deliver">
              배달비 : {laundry.deliverCost} 원
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="ctm-laundry-toggle">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="laundry order tab">
              <Tab
                className="ctm-laundry-toggle-tab"
                label="주문"
                {...a11yProps(0)}
              />
              <Tab
                className="ctm-laundry-toggle-tab"
                label="정보"
                {...a11yProps(1)}
              />
              <Tab
                className="ctm-laundry-toggle-tab"
                label="리뷰"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="ctm-laundry-toggle-order">
              <div className="ctm-laundry-rather-pickup">
                <div className="ctm-laundry-rather-pickup-title">수령 방법</div>
                <div className="ctm-laundry-rather-pickup-radio">
                  <RadioGroup row value={orderType} onChange={handleDeliver}>
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="직접 수거"
                    />
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="배달"
                    />
                  </RadioGroup>
                </div>
              </div>
              <div className="ctm-laundry-toggle-order-title">품목</div>
              <div className="ctm-laundry-toggle-order-items">
                {laundryItemList.map((item, idx) => (
                  <div className="itemlist" key={item.id}>
                    <div className="item-text-name">
                      {item.name} {item.price} 원
                    </div>
                    <Box className="ctm-laundry-toggle-box">
                      <IconButton
                        onClick={() => minusOne(idx)}
                        disabled={orderDetails[idx] === 0}>
                        <HorizontalRuleIcon />
                      </IconButton>
                      {orderDetails[idx]} 개
                      <IconButton onClick={() => plusOne(idx)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </div>
                ))}
              </div>
              <div className="ctm-laundry-toggle-order-result">
                <div className="ctm-laundry-toggle-order-left">
                  <div className="item-text">
                    총 수량 : {orderDetails.reduce((a, b) => a + b, 0)} 개
                  </div>
                  <div className="item-text">예상 금액 : {totalPrice} 원</div>
                </div>
                <div className="ctm-laundry-toggle-order-right">
                  <button
                    className="order-button-button"
                    type="button"
                    disabled={totalPrice === 0 || totalPrice < laundry.minCost}
                    onClick={handleOrder}>
                    <span>주문하기</span>
                    <div className="order-button-cart">
                      <svg viewBox="0 0 36 26">
                        <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5" />
                        <polyline points="15 13.5 17 15.5 22 10.5" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="ctm-laundry-toggle-info">
              <Box
                borderRadius={1}
                sx={{
                  width: '51vh',
                  height: '10vh',
                  backgroundColor: '#E0EBF5'
                }}>
                <div className="ctm-laundry-description">
                  {laundry.description}
                </div>
              </Box>
              <div className="kakaomaps">
                <KakaoMaps
                  props={{ Lng: laundry.addrLng, Lat: laundry.addrLat }}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="ctm-laundry-toggle-review">
              <div className="ctm-laundry-toggle-review-rate">
                <div className="ctm-laundry-toggle-review-title">평점</div>
                <div className="ctm-laundry-toggle-review-star">
                  <div>
                    <Box>
                      {laundry.score === -1
                        ? null
                        : Math.round(laundry.score * 10) / 10}
                    </Box>
                  </div>
                  <div>
                    <Rating
                      name="text-feedback"
                      value={laundry.score}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      size="large"
                    />
                  </div>
                </div>
              </div>
              <div className="ctm-laundry-toggle-review-cnt">
                <div className="ctm-laundry-toggle-review-cnt1">리뷰</div>
                <div className="ctm-laundry-toggle-review-cnt2">
                  {reviewList.length}개
                </div>
              </div>
              <div className="ctm-laundry-toggle-review-content">
                {reviewList
                  .slice((pageReview - 1) * 3, pageReview * 3)
                  .map((review) => (
                    <div className="laundry-my-review">
                      <div className="review-wrap">
                        <div className="review-wrap-left">
                          <img
                            className="laundry-my-review-img"
                            src="../assets/user.png"
                            alt="user-img"
                          />
                        </div>
                        <div>
                          <div className="laundry-my-review-info">
                            <div className="laundry-my-review-nickname">
                              {review.userNickName
                                ? review.userNickName
                                : '익명'}
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
                        </div>
                      </div>
                      <div className="laundry-my-review-content">
                        {review.content}
                      </div>
                    </div>
                  ))}
                <div className="ctm-laundry-toggle-review-page">
                  <Pagination
                    count={Math.ceil(reviewList.length / 3)}
                    page={pageReview}
                    variant="outlined"
                    color="color2"
                    className={`${
                      reviewList.length === 0
                        ? 'ctm-no-pagination'
                        : 'ctm-pagination'
                    }`}
                    onChange={pageReviewChange}
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default CtmLaundryDetailTemp;
