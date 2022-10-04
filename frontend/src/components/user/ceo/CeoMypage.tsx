import {
  Button,
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
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  LaundryItemAddRequest,
  LaundryItemDelRequest,
  LaundryRegistRequest,
  LaundryReviewRequest,
  myLaundryItemsRequest,
  myLaundryRequest
} from '../../../store/actions/services/laundryService';
import { InfoRequest } from '../../../store/actions/services/userService';
import UploadPhoto from '../../common/UploadPhoto';
import Loading from '../../common/Loading';
import Address from '../../../components/common/Address';

const CeoMypage: React.FC = () => {
  const TemplaundryName = '싸피 세탁소';
  const [clean, setClean] = useState<number>(12340000000000);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [openModal3, setOpenModal3] = useState<boolean>(false);

  const [addr, setAddr] = useState<string>('');

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
  const [addrInfo, setAddrInfo] = useState('');

  // 세탁소 등록 시 필요한 정보
  const [regNum, setRegNum] = useState('');
  const [laundryName, setLaundryName] = useState<string>('');
  const [ceoName, setCeoName] = useState<string>('');
  const [regDate, setRegDate] = useState('');
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [minCost, setMinCost] = useState(0);
  const [deliveryCost, setdeliveryCost] = useState(0);
  const [pickup, setPickup] = useState<string>('true');
  const [deliver, setDeliver] = useState<string>('true');

  // 모달창
  const [openRegist, setOpenRegist] = useState<boolean>(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  // 이미지 변경
  const [imgSrc, setImgSrc] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setCeoInfo(result?.data?.userInfo);
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
    } else {
      navigate('/error');
    }
  };

  const getMyItems = async () => {
    const result = await myLaundryItemsRequest(laundryList[0].laundryId);
    dispatch(result);
    if (result?.payload?.data?.laundryItems) {
      setItemList(result?.payload?.data?.laundryItems);
    } else {
      navigate('/error');
    }
  };

  const getMyReviews = async () => {
    console.log(laundryList);
    const result = await LaundryReviewRequest(laundryList[0].laundryId);
    if (result?.data?.review) {
      setReviewList(result?.data?.review);
    } else {
      navigate('/error');
    }
  };

  const registItem = async () => {
    const item = {
      name: itemName,
      price: itemPrice
    };
    const result = await LaundryItemAddRequest(laundryList[0].laundryId, item);
    if (result?.data?.message === 'Success') {
      getMyItems();
      setItemName('');
      setItemPrice(0);
      setRegDate('');
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    setPending(true);
    getMyInfo();
    getMyLaundry();
    if (laundryList.length > 0) {
      getMyReviews();
    }
    setTimeout(() => {
      setPending(false);
    }, 3000);
  }, []);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleOpen = (value) => {
    switch (value) {
      case 1:
        setOpenRegist(true);
        break;
      case 2:
        setOpenModal2(true);
        break;
      case 3:
        setOpenModal3(true);
        break;
      case 4:
        setOpenImage(true);
        break;
      case 5:
        setOpenAddress(true);
        break;
      default:
        break;
    }
  };

  // 1 :  / 2:  / 3 :  / 4 : 이미지 변경
  const handleClose = (value) => {
    switch (value) {
      case 1:
        setOpenRegist(false);
        break;
      case 2:
        setOpenModal2(false);
        break;
      case 3:
        setOpenModal3(false);
        break;
      case 4:
        setOpenImage(false);
        break;
      case 5:
        setOpenAddress(false);
        break;
      default:
        break;
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

  const handleRegistLaundry = async () => {
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

    const result = await LaundryRegistRequest(LaundryInfo);
    if (result?.data?.message === 'Success') {
      alert('세탁소 등록이 되었습니다.');
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
    // if (result?.data?.userInfo) {
    //   setUserInfo(result?.data?.userInfo);
    // } else {
    //   console.log('error');
    // }
  };
  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliver(event.target.value);
  };

  const handlePickup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(event.target.value);
  };

  // 주소 변경 로직
  const AddressFunc = (value) => {
    setAddrInfo(value);
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

  return (
    <div className="ceo-my-page">
      {pending ? (
        <Loading />
      ) : (
        <>
          <div className="ceo-my-info">
            <div className="ceo-my-info-title">사업자 정보</div>
            <div className="ceo-my-info-content">
              <div>{TemplaundryName}님, 오늘도 화이팅!</div>
              <div>(클린 아이콘 들어갈 예정) {clean} 클린</div>
            </div>
            <Dialog open={openRegist} onClose={() => handleClose(1)}>
              <div className="ceo-item-modal">
                <DialogTitle>세탁소 등록하기</DialogTitle>
                <DialogContent>
                  <div className="ceo-regist-laundry">
                    <TextField
                      sx={{ mt: 1 }}
                      required
                      label="사업자 등록번호"
                      name="laundry-num"
                      fullWidth
                      value={regNum}
                      onChange={(event) => setRegNum(event.target.value.trim())}
                    />
                    <TextField
                      sx={{ mt: 2, mb: 1 }}
                      required
                      label="대표자 성명"
                      name="ceo-name"
                      fullWidth
                      value={ceoName}
                      onChange={(event) =>
                        setCeoName(event.target.value.trim())
                      }
                    />
                    <TextField
                      sx={{ mt: 2, mb: 1 }}
                      required
                      label="개업일자"
                      name="reg-date"
                      type="date"
                      fullWidth
                      value={regDate}
                      onChange={(event) => setRegDate(event.target.value)}
                    />
                    <TextField
                      sx={{ mt: 2, mb: 1 }}
                      required
                      label="상호명"
                      name="laundry-name"
                      fullWidth
                      value={laundryName}
                      onChange={(event) => setLaundryName(event.target.value)}
                    />
                    <button type="button" onClick={() => handleOpen(5)}>
                      주소 등록하기
                    </button>
                    <TextField
                      sx={{ mt: 2, mb: 2 }}
                      required
                      label="기본 주소"
                      name="laundry-addr"
                      fullWidth
                      value={addrInfo.addr}
                      disabled
                    />
                    <TextField
                      sx={{ mt: 2, mb: 2 }}
                      required
                      label="상세 주소"
                      name="laundry-addr"
                      fullWidth
                      value={addrInfo.addrDetail}
                      disabled
                    />
                    <TextField
                      sx={{ mt: 2, mb: 2 }}
                      required
                      label="세탁소에 대해서 작성해주세요. 이 정보는 고객들이 세탁소를 선택하는 데에 도움이 될 거예요.^^"
                      fullWidth
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                      sx={{ mt: 2, mb: 2 }}
                      required
                      label="세탁소 전화번호"
                      fullWidth
                      value={contact
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                      onChange={(event) =>
                        setContact(event.target.value.trim())
                      }
                    />
                    <div className="ceo-modal-bottom">
                      <div>
                        배달 가능 여부
                        <RadioGroup value={deliver} onChange={handleDeliver}>
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="배달 가능"
                          />
                          {deliver === 'true' ? (
                            <>
                              <TextField
                                sx={{ mt: 2, mb: 2 }}
                                required
                                label="최소 주문 금액"
                                fullWidth
                                type="number"
                                value={minCost}
                                onChange={handleMinCost}
                              />
                              <TextField
                                sx={{ mt: 2, mb: 2 }}
                                required
                                label="배달비"
                                fullWidth
                                type="number"
                                value={deliveryCost}
                                onChange={handleDeliveryCost}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="배달 불가 (손님이 직접 수거)"
                          />
                        </RadioGroup>
                      </div>
                      <div>
                        픽업 가능 여부
                        <RadioGroup value={pickup} onChange={handlePickup}>
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="손님이 수거 가능"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="손님이 수거 불가능(배달만 가능)"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(1)} color="color2">
                    취소
                  </Button>
                  <Button
                    onClick={handleRegistLaundry}
                    variant="contained"
                    color="color2">
                    등록하기
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
            <Dialog open={openModal2} onClose={() => handleClose(2)}>
              <div className="ceo-item-modal">
                <DialogTitle>세탁 품목 변경하기</DialogTitle>
                <DialogContent>
                  <List sx={{ height: 200, overflow: 'auto' }}>
                    {itemList.map((item) => (
                      <div className="ceo-item" key={item.id}>
                        <ListItem>
                          <button
                            type="button"
                            onClick={() => delItem(item.id)}
                            className="ceo-item-del-btn">
                            삭제
                          </button>
                          <ListItemText
                            primary={`${item.name} : ${item.price}원`}
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>
                  <div className="ceo-add-new-item">
                    <div>새로운 품목 추가하기</div>
                    <TextField
                      sx={{ mt: 2 }}
                      required
                      label="품목명"
                      name="item-id"
                      fullWidth
                      value={itemName}
                      onChange={(event) =>
                        setItemName(event.target.value.trim())
                      }
                    />
                    <TextField
                      sx={{ mt: 2, mb: 1 }}
                      required
                      label="가격 (단위 : 클린)"
                      name="item-price"
                      type="number"
                      fullWidth
                      value={itemPrice}
                      onChange={(event) =>
                        setItemPrice(parseInt(event.target.value, 10))
                      }
                    />
                    <button
                      type="button"
                      className="ceo-add-new-item-btn"
                      onClick={registItem}>
                      추가
                    </button>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(2)} color="color2">
                    취소
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
            {laundryList.length === 0 ? (
              <button
                type="button"
                className="ceo-my-page-btn"
                onClick={() => handleOpen(1)}>
                세탁소 등록하기
              </button>
            ) : (
              <>
                <div className="ctm-my-info-content-left">
                  {imgSrc.map((url) => (
                    <img src={url} alt="profileImg" width={100} />
                  ))}
                  <Button
                    variant="contained"
                    color="color2"
                    className="ctm-my-page-btn"
                    onClick={() => handleOpen(4)}>
                    사진 변경하기
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="color2"
                  className="ceo-my-page-btn"
                  onClick={() => handleOpen(2)}>
                  세탁 품목 변경하기
                </Button>
              </>
            )}
          </div>
          {laundryList.length === 0 ? (
            <div className="ceo-right">
              <div className="ceo-right-text">
                세탁소를 등록해서 세탁클로쓰의 더 많은 서비스를 이용해보세요.
              </div>
              <img
                src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry2.png"
                className="ceo-right-img"
                alt="laundry-img"
              />
            </div>
          ) : (
            <div className="ceo-my-review-list">
              <div className="ceo-my-review-list-title">
                우리 세탁소 리뷰 보기
              </div>
              {reviewList.length === 0 ? (
                <div className="ceo-my-review-none">
                  <div className="ceo-my-review-none-text">
                    아직 우리 세탁소의 리뷰를 작성한 고객이 없습니다.
                  </div>
                  <div className="ceo-my-review-none-text">
                    열심히 세탁소를 홍보합시다.
                  </div>
                  <img
                    src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/cry-laundry.jpeg"
                    className="ceo-right-img"
                    alt="laundry-img"
                  />
                </div>
              ) : (
                <>
                  <div>총 {reviewList.length}개의 리뷰가 존재합니다.</div>
                  <div className="ceo-my-review-list-content">
                    {reviewList
                      .slice((page - 1) * 5, page * 5)
                      .map((review) => (
                        <Link key={review} to="/ceo/mypage">
                          <div className="ceo-my-review">{review.content}</div>
                        </Link>
                      ))}
                    <div className="ceo-pagination">
                      <Pagination
                        count={Math.ceil(reviewList.length / 5)}
                        page={page}
                        // variant="outlined"
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
                </>
              )}
            </div>
          )}
        </>
      )}
      {/* 모달 모음집 */}
      <Dialog open={openImage} onClose={() => handleClose(3)}>
        <UploadPhoto
          changeImageSrc={changeImageSrc}
          handleClose={handleClose}
          imgCnt={imgCnt}
          laundryId={laundryId}
        />
      </Dialog>

      <Dialog open={openAddress} onClose={() => handleClose(3)}>
        <Address
          AddressFunc={AddressFunc}
          handleClose={handleClose}
          type="regist"
        />
      </Dialog>
    </div>
  );
};

export default CeoMypage;
