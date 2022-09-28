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
  myLaundryItemsRequest,
  myLaundryRequest
} from '../../../store/actions/services/laundryService';
import { InfoRequest } from '../../../store/actions/services/userService';

const CeoMypage: React.FC = () => {
  const TemplaundryName = '싸피 세탁소';
  const [clean, setClean] = useState<number>(12340000000000);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [regNum, setRegNum] = useState('');
  const [ceoName, setCeoName] = useState<string>('');
  const [openDate, setOpenDate] = useState('');
  const [laundryName, setLaundryName] = useState<string>('');
  const [addr, setAddr] = useState<string>('');
  const [deliver, setDeliver] = useState<string>('true');
  const [pickup, setPickup] = useState<string>('true');
  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [laundryList, setLaundryList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [ceoInfo, setCeoInfo] = useState('');
  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMyInfo = async () => {
    const result = await InfoRequest();
    if (result?.data?.userInfo) {
      setCeoInfo(result?.data?.userInfo);
    } else {
      console.log('error');
    }
  };

  const getMyLaundry = async () => {
    const result = await myLaundryRequest();
    if (result?.payload?.data?.laundries) {
      setLaundryList(result?.payload?.data?.laundries);
    } else {
      console.log('error');
    }
  };

  const getMyItems = async () => {
    const result = await myLaundryItemsRequest(laundryList[0].laundryId);
    dispatch(result);
    if (result?.payload?.data?.laundryItems) {
      setItemList(result?.payload?.data?.laundryItems);
    } else {
      console.log('error');
    }
  };

  const getMyReviews = async () => {
    const result = await LaundryRegistRequest(laundryList[0].laundryId);
    if (result?.data?.review) {
      setReviewList(result?.data?.review);
    } else {
      console.log('error');
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
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getMyInfo();
    getMyLaundry();
  }, []);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 1) {
      setOpenModal1(true);
    } else if (modalType === 2) {
      getMyItems();
      setOpenModal2(true);
    }
  };

  const handleClose = (modalType) => {
    if (modalType === 1) {
      setOpenModal1(false);
    } else if (modalType === 2) {
      setOpenModal2(false);
    }
  };

  const delItem = async (id) => {
    const result = await LaundryItemDelRequest(laundryList[0].laundryId, id);
    if (result?.data?.message === 'Success') {
      getMyItems();
    } else {
      console.log('error');
    }
  };

  const handleSetItem = () => {
    // 등록 과정
  };

  const handleRegistLaundry = async () => {
    const LaundryInfo = {
      regNum,
      laundryName,
      ceoName,
      addr,
      addrDetail: 'ㅎㅇ',
      addrLat: 1.0,
      addrLng: 1.3,
      deliver,
      pickup
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
        console.log('error');
      }
      navigate('../mypage');
    } else {
      console.log('error');
    }

    setOpenModal1(false);
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

  return (
    <div className="ceo-my-page">
      <div className="ceo-my-info">
        <div className="ceo-my-info-title">사업자 정보</div>
        <div className="ceo-my-info-content">
          <div>{TemplaundryName}님, 오늘도 화이팅!</div>
          <br />
          <div>세탁소 정보 보여줄까 말까</div>
          <br />
          <div>(클린 아이콘 들어갈 예정) {clean} 클린</div>
        </div>
        <Dialog open={openModal1} onClose={() => handleClose(1)}>
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
                  onChange={(event) => setCeoName(event.target.value.trim())}
                />
                <TextField
                  sx={{ mt: 2, mb: 1 }}
                  required
                  label="개업일자"
                  name="open-date"
                  type="date"
                  fullWidth
                  value={openDate}
                  onChange={(event) => setOpenDate(event.target.value)}
                />
                <TextField
                  sx={{ mt: 2, mb: 1 }}
                  required
                  label="상호명"
                  name="laundry-name"
                  fullWidth
                  value={laundryName}
                  onChange={(event) =>
                    setLaundryName(event.target.value.trim())
                  }
                />
                <TextField
                  sx={{ mt: 2, mb: 2 }}
                  required
                  label="주소"
                  name="laundry-addr"
                  fullWidth
                  value={addr}
                  onChange={(event) => setAddr(event.target.value.trim())}
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
                  onChange={(event) => setItemName(event.target.value.trim())}
                />
                <TextField
                  sx={{ mt: 2, mb: 1 }}
                  required
                  label="가격 (단위 : 원)"
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
              <Button
                onClick={handleSetItem}
                variant="contained"
                color="color2">
                확인
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        {laundryList.length === 0 ? (
          <button
            type="button"
            className="ceo-my-page-btn"
            onClick={() => handleOpenModal(1)}>
            세탁소 등록하기
          </button>
        ) : (
          <Button
            variant="contained"
            color="color2"
            className="ceo-my-page-btn"
            onClick={() => handleOpenModal(2)}>
            세탁 품목 변경하기
          </Button>
        )}
      </div>
      {laundryList.length === 0 ? (
        <div className="ceo-right">
          <div className="ceo-right-text">
            세탁소를 등록해서 세탁클로쓰의 더 많은 서비스를 이용해보세요.
          </div>
          <img
            src="https://via.placeholder.com/150/BFD7EA/111111"
            className="ceo-right-img"
            alt="laundry-img"
          />
        </div>
      ) : (
        <div className="ceo-my-review-list">
          <div className="ceo-my-review-list-title">우리 세탁소 리뷰 보기</div>
          {reviewList.length === 0 ? (
            <div className="ceo-my-review-none">
              <div className="ceo-my-review-none-text">
                아직 우리 세탁소의 리뷰를 작성한 고객이 없습니다.
              </div>
              <div className="ceo-my-review-none-text">
                열심히 세탁소를 홍보합시다.
              </div>
              <img
                src="https://via.placeholder.com/150/BFD7EA/111111"
                className="ceo-right-img"
                alt="laundry-img"
              />
            </div>
          ) : (
            <>
              <div>총 {reviewList.length}개의 리뷰가 존재합니다.</div>
              <div className="ceo-my-review-list-content">
                {reviewList.slice((page - 1) * 5, page * 5).map((review) => (
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
    </div>
  );
};

export default CeoMypage;
