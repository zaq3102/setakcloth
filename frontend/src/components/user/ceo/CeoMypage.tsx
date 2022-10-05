import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Radio,
  RadioGroup,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KakaoMaps from '../../common/KakaoMaps';
import {
  LaundryInfoChange,
  LaundryItemAddRequest,
  LaundryItemDelRequest,
  LaundryReviewRequest,
  myLaundryItemsRequest,
  myLaundryRequest
} from '../../../store/actions/services/laundryService';
import { InfoRequest } from '../../../store/actions/services/userService';
import UploadPhoto from '../../common/UploadPhoto';
import Loading from '../../common/Loading';
import Address from '../../common/Address';

const CeoMypage: React.FC = () => {
  const [clean, setClean] = useState<number>(0);

  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [laundryList, setLaundryList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [ceoInfo, setCeoInfo] = useState('');
  const [itemList, setItemList] = useState([]);
  const [pending, setPending] = useState(false);
  const [laundryId, setLaundryId] = useState(0);
  const imgCnt = 1;

  const [addrInfo, setAddrInfo] = useState({});
  const [addr, setAddr] = useState('');
  const [addrDetail, setAddrDetail] = useState('');

  // 세탁소 등록 시 필요한 정보
  const [regNum, setRegNum] = useState('');
  const [laundryName, setLaundryName] = useState<string>('');
  const [ceoName, setCeoName] = useState<string>('');
  const [regDate, setRegDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [minCost, setMinCost] = useState(0);
  const [deliveryCost, setdeliveryCost] = useState(0);
  const [pickup, setPickup] = useState<boolean>(true);
  const [deliver, setDeliver] = useState<boolean>(true);

  // 모달창
  const [openAddress, setOpenAddress] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [openChange, setOpenChange] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<boolean>(false);

  // 이미지 변경
  const [imgSrc, setImgSrc] = useState([]);

  // 리뷰 가져오기
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setCeoInfo(result?.data?.userInfo);
      setClean(result?.data?.userInfo?.balance);
    } else {
      navigate('/error');
    }
  };

  const getMyLaundry = async () => {
    const result = await myLaundryRequest();
    if (result?.payload?.data?.laundries) {
      setLaundryList(result?.payload?.data?.laundries);
      setLaundryId(result?.payload?.data?.laundries[0]?.laundryId);
      setImgSrc([result?.payload?.data?.laundries[0].imgUrl]);

      // 이미 등록된 세탁소일 때
      const addrTemp = {
        addr: result?.payload?.data?.laundries[0].addr,
        addrDetail: result?.payload?.data?.laundries[0].addrDetail,
        addrLng: result?.payload?.data?.laundries[0].addrLng,
        addrLat: result?.payload?.data?.laundries[0].addrLat
      };
      setAddrInfo(addrTemp);
      setAddr(result?.payload?.data?.laundries[0].addr);
      setAddrDetail(result?.payload?.data?.laundries[0].addrDetail);
      setLaundryName(result?.payload?.data?.laundries[0].laundryName);
      setDescription(result?.payload?.data?.laundries[0].description);
      setContact(result?.payload?.data?.laundries[0].contact);
      setMinCost(result?.payload?.data?.laundries[0].minCost);
      setdeliveryCost(result?.payload?.data?.laundries[0].deliverCost);
      setPickup(result?.payload?.data?.laundries[0].pickup);
      setDeliver(result?.payload?.data?.laundries[0].deliver);

      // 세탁 품목 등록하기
      const result2 = await myLaundryItemsRequest(
        result?.payload?.data?.laundries[0]?.laundryId
      );
      dispatch(result2);
      if (result2?.payload?.data?.laundryItems) {
        setItemList(result2?.payload?.data?.laundryItems);
      } else {
        navigate('/error');
      }

      // 리뷰 목록 불러오기
      const result3 = await LaundryReviewRequest(
        result?.payload?.data?.laundries[0]?.laundryId
      );
      if (result3?.data?.reviews) {
        setReviewList(result3?.data?.reviews);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/error');
    }
  };

  const getMyItems = async () => {
    const result = await myLaundryItemsRequest(laundryId);
    dispatch(result);
    if (result?.payload?.data?.laundryItems) {
      setItemList(result?.payload?.data?.laundryItems);
    } else {
      navigate('/error');
    }
  };

  const getMyReviews = async () => {
    const result = await LaundryReviewRequest(laundryList[0].laundryId);
    if (result?.data?.review) {
      setReviewList(result?.data?.review);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    // setPending(true);
    getMyInfo();
    getMyLaundry();
    // setTimeout(() => {
    //   setPending(false);
    // }, 3000);
  }, []);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleClose = (value) => {
    switch (value) {
      case 3:
        setOpenItem(false);
        setItemName('');
        setItemPrice(0);
        break;
      case 4:
        setOpenImage(false);
        break;
      case 5:
        setOpenAddress(false);
        break;
      case 6:
        setOpenChange(false);
        break;
      default:
        break;
    }
  };

  const registItem = async () => {
    const item = {
      name: itemName,
      price: itemPrice
    };
    const result = await LaundryItemAddRequest(laundryId, item);
    if (result?.data?.message === 'Success') {
      getMyItems();
      setItemName('');
      setItemPrice(0);
      handleClose(3);
    } else {
      navigate('/error');
    }
  };

  const delItem = async (id) => {
    const result = await LaundryItemDelRequest(laundryList[0].laundryId, id);
    if (result?.data?.message === 'Success') {
      getMyItems();
    } else {
      navigate('/error');
    }
  };

  const handleChangeLaundry = async () => {
    const LaundryInfo = {
      regNum,
      laundryName,
      ceoName,
      regDate,
      addr: addrInfo.addr,
      addrDetail: addrInfo.addrDetail,
      addrLat: addrInfo.addrLat,
      addrLng: addrInfo.addrLng,
      deliver,
      pickup,
      description,
      contact,
      deliveryCost,
      minCost
    };

    const result = await LaundryInfoChange(laundryId, LaundryInfo);
    if (result?.data?.message === 'Success') {
      alert('세탁소 수정이 완료되었습니다.');
      setCeoName('');
      handleClose(6);
      // 나중에 redux를 활용하는 방식으로 바꾸면 좋을 듯
      getMyLaundry();
      const result2 = await myLaundryRequest();
      if (result2?.payload?.data?.laundries) {
        dispatch(result2);
      } else {
        navigate('/error');
      }
      navigate('../mypage');
    } else {
      navigate('/error');
    }
    handleClose(1);
  };

  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true') {
      setDeliver(true);
    } else {
      setDeliver(false);
      setdeliveryCost(0);
      setMinCost(0);
    }
  };

  const handlePickup = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true') {
      setPickup(true);
    } else {
      setPickup(false);
    }
  };

  // 이미지 변경 로직
  const changeImageSrc = (value) => {
    setImgSrc(value);
  };

  const handleMinCost = (event) => {
    if (event.target.value.trim() < 0) {
      setMinCost(0);
    } else {
      setMinCost(event.target.value.trim());
    }
  };

  const handleDeliveryCost = (event) => {
    if (event.target.value.trim() < 0) {
      setdeliveryCost(0);
    } else {
      setdeliveryCost(event.target.value.trim());
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setAddrInfo(value);
    setAddr(value.addr);
    setAddrDetail(value.addrDetail);
  };

  return (
    <div className="ceo-mypage">
      {pending ? (
        <Loading />
      ) : (
        <div className="ceo-mypage-inside">
          <div className="ceo-mypage-left">
            <div className="ceo-laundry-info-card">
              <Card>
                <CardMedia>
                  <img
                    className="ceo-laundry-mypage-img"
                    src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry0.png"
                    alt="laundry-img"
                  />
                </CardMedia>
                <CardContent
                  sx={{ width: 1, height: 1, paddingRight: 3, paddingLeft: 5 }}>
                  <Chip
                    className="ceo-laundry-chip"
                    size="small"
                    label="배달"
                    variant="outlined"
                    color="color1"
                  />
                  <Chip
                    className="ceo-laundry-chip"
                    size="small"
                    label="수거"
                    variant="outlined"
                  />
                  <div className="ceo-laundry-title-space">
                    <div>
                      <div className="ceo-laundry-title">
                        <div>{laundryName}</div>
                      </div>
                      <div className="ceo-laundry-addr">
                        {laundryList[0]?.addr} {laundryList[0]?.addrDetail}
                      </div>
                      <div className="ceo-laundry-num">{contact}</div>
                    </div>
                  </div>
                  <br />
                  <div>최소 주문 금액 : {minCost} 원</div>
                  <div>배달비 : {deliveryCost} 원</div>
                  <Button
                    className="ceo-laundry-change-btn"
                    onClick={() => setOpenChange(true)}
                    focused
                    variant="contained"
                    color="color2_2"
                    sx={{ marginTop: 3 }}>
                    세탁소 정보 수정하기
                  </Button>
                </CardContent>
              </Card>
              <Box boxShadow={0} className="ceo-mypage-card">
                <div className="ceo-mypage-card-title">
                  <div className="ceo-mypage-card-label">지갑 잔액</div>
                </div>
                <div className="ceo-mypage-cln">{clean} CLN</div>
                <Box className="ceo-mypage-box-warn">
                  <div className="ceo-mypage-warn">부자되세요~!!</div>
                </Box>
              </Box>
            </div>
          </div>
          <div className="ceo-mypage-right">
            <div className="ceo-laundry-toggle">
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="laundry order tab">
                    <Tab
                      className="ceo-laundry-toggle-tab"
                      label="품목"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="ceo-laundry-toggle-tab"
                      label="정보"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className="ceo-laundry-toggle-tab"
                      label="리뷰"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div className="ceo-laundry-toggle-order-items">
                    <List
                      sx={{
                        width: '51vh'
                      }}>
                      {itemList.map((item, idx) => (
                        <ListItem
                          className="ceo-mypage-item-clean"
                          key={item.id}>
                          <ListItemText primary={item.name} />
                          <ListItemText
                            primary={`${item.price} 클린`}
                            sx={{ textAlign: 'right', marginLeft: 10 }}
                          />
                          <Button
                            onClick={() => delItem(item.id)}
                            focused
                            color="color2_2"
                            sx={{ paddingLeft: 5 }}>
                            <DeleteForeverIcon />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                    <div className="ceo-mypage-item-add-button">
                      <Button
                        className="ceo-add-new-item-btn"
                        onClick={() => setOpenItem(true)}
                        focused
                        variant="contained"
                        color="color2_2"
                        sx={{ marginRight: 3 }}>
                        추가
                      </Button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box
                    borderRadius={1}
                    sx={{
                      width: '51vh',
                      height: '10vh',
                      backgroundColor: '#E0EBF5'
                    }}>
                    <div className="ctm-laundry-description">
                      {laundryList[0]?.description}
                    </div>
                  </Box>
                  <div className="kakaomaps">
                    <KakaoMaps
                      props={{
                        Lng: laundryList[0]?.addrLng,
                        Lat: laundryList[0]?.addrLat
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div className="ceo-laundry-toggle-review">
                    <div className="ceo-laundry-toggle-review-rate">
                      <div className="ceo-laundry-toggle-review-title">
                        평점
                      </div>
                      <div className="ceo-laundry-toggle-review-star">
                        <div>
                          <Box>
                            {laundryList[0]?.score === -1
                              ? null
                              : Math.round(laundryList[0]?.score * 10) / 10}
                          </Box>
                        </div>
                        <div>
                          <Rating
                            name="text-feedback"
                            value={laundryList[0]?.score}
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
                    <div className="ceo-laundry-toggle-review-cnt">
                      <div className="ceo-laundry-toggle-review-cnt1">
                        리뷰 {reviewList.length}개
                      </div>
                    </div>
                    <div className="ceo-laundry-toggle-review-content">
                      {reviewList
                        .slice((page - 1) * 3, page * 3)
                        .map((review) => (
                          <div className="ceo-laundry-my-review">
                            <div className="ceo-review-wrap">
                              <div className="ceo-review-wrap-left">
                                <img
                                  className="ceo-laundry-my-review-img"
                                  src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/user.png"
                                  alt="user-img"
                                />
                              </div>
                              <div className="ceo-review-wrap-right">
                                <div className="ceo-laundry-my-review-nickname">
                                  {review.userNickName}
                                </div>
                                <div className="ceo-laundry-my-review-rate">
                                  <Rating
                                    value={review.score}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon />}
                                    size="medium"
                                  />
                                </div>
                                <div className="ceo-laundry-my-review-content">
                                  {review.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="ceo-laundry-toggle-review-page">
                        <Pagination
                          count={Math.ceil(reviewList.length / 3)}
                          page={page}
                          variant="outlined"
                          color="color2"
                          className={`${
                            reviewList.length === 0
                              ? 'ceo-no-pagination'
                              : 'ceo-pagination'
                          }`}
                          onChange={pageChange}
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      )}
      {/* 모달 모음집 */}
      <Dialog open={openImage} onClose={() => handleClose(4)}>
        <UploadPhoto
          changeImageSrc={changeImageSrc}
          handleClose={handleClose}
          imgCnt={imgCnt}
          id={laundryId}
        />
      </Dialog>

      <Dialog open={openChange} onClose={() => handleClose(6)}>
        <div className="ceo-item-modal">
          <DialogTitle sx={{ fontSize: 'x-large', fontWeight: 'bold' }}>
            세탁소 변경하기
          </DialogTitle>
          <DialogContent>
            <div className="ceo-regist-laundry">
              <TextField
                sx={{ mt: 1, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="대표자 성명"
                name="ceo-name"
                fullWidth
                value={ceoName}
                onChange={(event) => setCeoName(event.target.value.trim())}
              />
              <TextField
                sx={{ mt: 2, mb: 3, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="상호명"
                name="laundry-name"
                fullWidth
                value={laundryName}
                onChange={(event) => setLaundryName(event.target.value)}
              />
              <div className="address-item">
                <div className="address-reg-btn">
                  <Button
                    onClick={() => setOpenAddress(true)}
                    variant="outlined"
                    color="color2_2">
                    주소 검색
                  </Button>
                </div>
                <TextField
                  sx={{ mt: 2, mb: 2, bgcolor: '#F8FFFD' }}
                  variant="filled"
                  focused
                  color="color2_2"
                  required
                  label="기본 주소"
                  name="laundry-addr"
                  fullWidth
                  value={addr}
                  disabled
                />
                <TextField
                  sx={{ mt: 2, bgcolor: '#F8FFFD' }}
                  variant="filled"
                  focused
                  color="color2_2"
                  required
                  label="상세 주소"
                  name="laundry-addr"
                  fullWidth
                  value={addrDetail}
                  disabled
                />
              </div>
              <TextField
                sx={{ mt: 3, mb: 1, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="세탁소 설명"
                fullWidth
                multiline
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="최대 255자까지 작성할 수 있습니다."
                inputProps={{
                  maxLength: 255
                }}
              />
              <TextField
                sx={{ mt: 2, mb: 3, bgcolor: '#F8FFFD' }}
                variant="filled"
                focused
                color="color2_2"
                required
                label="세탁소 전화번호"
                fullWidth
                value={contact
                  .replace(/[^0-9]/g, '')
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                onChange={(event) => setContact(event.target.value.trim())}
              />
              <div className="ceo-modal-bottom">
                <div className="bool-text">
                  배달 가능 여부
                  <RadioGroup value={deliver} onChange={handleDeliver}>
                    <FormControlLabel value control={<Radio />} label="가능" />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="배달 불가 (손님이 직접 수거)"
                    />
                    {deliver === true ? (
                      <>
                        <TextField
                          color="color2_2"
                          variant="filled"
                          focused
                          sx={{ mt: 3, mb: 1, bgcolor: '#F8FFFD' }}
                          required
                          label="최소 주문 금액"
                          fullWidth
                          type="number"
                          inputProps={{
                            step: 1000
                          }}
                          value={minCost}
                          onChange={handleMinCost}
                        />
                        <TextField
                          color="color2_2"
                          variant="filled"
                          focused
                          sx={{ mt: 2, mb: 2, bgcolor: '#F8FFFD' }}
                          required
                          label="배달료"
                          fullWidth
                          type="number"
                          inputProps={{
                            step: 1000
                          }}
                          value={deliveryCost}
                          onChange={handleDeliveryCost}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </RadioGroup>
                </div>
                <div className="bool-text">
                  픽업(손님이 직접 수거) 가능 여부
                  <RadioGroup value={pickup} onChange={handlePickup}>
                    <FormControlLabel value control={<Radio />} label="가능" />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="불가능"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleChangeLaundry}
              focused
              variant="contained"
              color="color2_2"
              disabled={
                !laundryName ||
                !ceoName ||
                !addrInfo ||
                !description ||
                !contact
              }>
              수정하기
            </Button>
            <Button onClick={() => handleClose(6)} color="color2_2">
              취소
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* 주소 변경 모달 */}
      <Dialog open={openAddress} onClose={() => handleClose(5)}>
        <Address
          AddressFunc={AddressFunc}
          handleClose={handleClose}
          type="regist"
        />
      </Dialog>

      <Dialog open={openItem} onClose={() => handleClose(3)}>
        <DialogTitle>새로운 품목 추가하기</DialogTitle>
        <TextField
          sx={{ mt: 2, bgcolor: '#F8FFFD' }}
          variant="filled"
          focused
          color="color2_2"
          required
          label="품목명"
          name="item-id"
          fullWidth
          value={itemName}
          onChange={(event) => setItemName(event.target.value.trim())}
          placeholder="최대 10글자까지 작성할 수 있습니다."
          inputProps={{
            maxLength: 10
          }}
        />
        <TextField
          sx={{ mt: 1, mb: 3, bgcolor: '#F8FFFD' }}
          variant="filled"
          focused
          color="color2_2"
          required
          label="가격 (단위 : 클린)"
          name="item-price"
          type="number"
          inputProps={{
            step: 1000
          }}
          fullWidth
          value={itemPrice}
          onChange={(event) => setItemPrice(parseInt(event.target.value, 10))}
        />
        <DialogActions>
          <Button onClick={() => handleClose(3)} color="color2_2">
            취소
          </Button>
          <Button
            onClick={registItem}
            focused
            variant="contained"
            color="color2_2">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CeoMypage;
