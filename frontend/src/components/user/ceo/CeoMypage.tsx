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
import { Link } from 'react-router-dom';
import { InfoRequest } from '../../../store/actions/services/userService';

const CeoMypage: React.FC = () => {
  const TemplaundryName = '싸피 세탁소';
  const [clean, setClean] = useState<number>(12340000000000);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const [openModal2, setOpenModal2] = useState<boolean>(false);
  const [laundryNum, setLaundryNum] = useState('');
  const [ceoName, setCeoName] = useState<string>('');
  const [openDate, setOpenDate] = useState('');
  const [laundryName, setLaundryName] = useState<string>('');
  const [laundryAddr, setLaundryAddr] = useState<string>('');
  const [laundryDeliver, setLaundryDeliver] = useState<string>('true');
  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [page, setPage] = useState(1);

  const getMypage = async () => {
    const result = await InfoRequest();
    console.log(result);
  };

  useEffect(() => {
    getMypage();
  }, []);

  const reviewList = [
    '리뷰 1입니다~~~~~',
    '리뷰 2입니다~~~~~',
    '리뷰 3입니다~~~~~',
    '리뷰 4입니다~~~~~',
    '리뷰 5입니다~~~~~',
    '리뷰 6입니다~~~~~',
    '리뷰 7입니다~~~~~',
    '리뷰 8입니다~~~~~',
    '리뷰 9입니다~~~~~',
    '리뷰 10입니다~~~~~',
    '리뷰 11입니다~~~~~'
  ];

  const itemList = {
    '와이셔츠 세탁': 5000,
    '모자 세탁': 3000,
    '치마 수선': 6000,
    '드라이클리닝': 10000,
    '모자 1세탁': 3000,
    '치마 1수선': 6000,
    '드라이2클리닝': 10000,
    '모자 세2탁': 3000,
    '치마 수4선': 6000,
    '드라이5클리닝': 10000,
    '모자 세6탁': 3000,
    '치마 수1선': 6000,
    '드라이클2리닝': 10000,
    '모자 세3탁': 3000,
    '치마 5수선': 6000,
    '드라3이클리닝': 10000,
    '모자 4세탁': 3000,
    '치마 3수선': 6000,
    '드라이2클4리닝': 10000,
    '모자 1세탁4': 3000,
    '치마 11수선': 6000,
    '드라이23클리닝': 10000
  };

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 1) {
      setOpenModal1(true);
    } else if (modalType === 2) {
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

  const itemAdd = () => {};

  const itemDel = () => {};

  const handleSetItem = () => {
    // 등록 과정
  };

  const handleRegistLaundry = () => {};

  const handleDeliver = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaundryDeliver(event.target.value);
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
                  value={laundryNum}
                  onChange={(event) => setLaundryNum(event.target.value.trim())}
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
                  value={laundryAddr}
                  onChange={(event) =>
                    setLaundryAddr(event.target.value.trim())
                  }
                />
                <div>배달 가능 여부</div>
                <RadioGroup value={laundryDeliver} onChange={handleDeliver}>
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
                {Object.keys(itemList).map((item) => (
                  <div className="ceo-item">
                    <ListItem key={item}>
                      <button
                        type="button"
                        onClick={itemDel}
                        className="ceo-item-del-btn">
                        삭제
                      </button>
                      <ListItemText primary={`${item} : ${itemList[item]}원`} />
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
                  onClick={itemAdd}>
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
                저장
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <button
          type="button"
          className="ceo-my-page-btn"
          onClick={() => handleOpenModal(1)}>
          세탁소 등록하기 (이미 등록했으면 버튼 안 뜰 것임)
        </button>
        <Button
          variant="contained"
          color="color2"
          className="ceo-my-page-btn"
          onClick={() => handleOpenModal(2)}>
          세탁 품목 변경하기 (세탁소 등록 안 했으면 버튼 안 뜰 것임)
        </Button>
      </div>
      <div className="ceo-my-review-list">
        <div className="ceo-my-review-list-title">우리 세탁소 리뷰 보기</div>
        <div>총 {reviewList.length}개의 게시물을 작성하였습니다.</div>
        <div className="ceo-my-review-list-content">
          {reviewList.slice((page - 1) * 5, page * 5).map((review) => (
            <Link key={review} to="/ceo/mypage">
              <div className="ceo-my-review">{review}</div>
            </Link>
          ))}
          <div className="ceo-pagination">
            <Pagination
              count={Math.ceil(reviewList.length / 5)}
              page={page}
              // variant="outlined"
              color="color2"
              className={`${
                reviewList.length === 0 ? 'ceo-no-pagination' : 'ceo-pagination'
              }`}
              onChange={pageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoMypage;
