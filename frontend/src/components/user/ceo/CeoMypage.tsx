import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Pagination,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CeoMypage: React.FC = () => {
  const laundryName = '싸피 세탁소';
  const [clean, setClean] = useState<number>(12340000000000);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const [page, setPage] = useState(1);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const itemAdd = () => {};

  const itemDel = () => {};

  const handleSetItem = () => {
    // 등록 과정
  };

  return (
    <div className="my-page">
      <div className="my-info">
        <div className="my-info-title">사업자 정보</div>
        <div className="my-info-content">
          <div>{laundryName}님, 오늘도 화이팅!</div>
          <br />
          <div>세탁소 정보 보여줄까 말까</div>
          <br />
          <div>(클린 아이콘 들어갈 예정) {clean} 클린</div>
        </div>
        <Dialog open={openModal} onClose={handleClose}>
          <div className="item-modal">
            <DialogTitle>세탁 품목 변경하기</DialogTitle>
            <DialogContent>
              <List sx={{ height: 200, overflow: 'auto' }}>
                {Object.keys(itemList).map((item) => (
                  <div className="item">
                    <ListItem key={item}>
                      <button
                        type="button"
                        onClick={itemDel}
                        className="item-del-btn">
                        삭제
                      </button>
                      <ListItemText primary={`${item} : ${itemList[item]}원`} />
                    </ListItem>
                  </div>
                ))}
              </List>
              <div className="add-new-item">
                <div>새로운 품목 추가하기</div>
                <TextField
                  sx={{ mt: 2 }}
                  required
                  label="품목명을 입력하세요."
                  name="item-id"
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2, mb: 1 }}
                  required
                  label="품목의 가격을 입력하세요. (단위 : 원)"
                  name="item-price"
                  type="number"
                  fullWidth
                />
                <button
                  type="button"
                  className="add-new-item-btn"
                  onClick={itemAdd}>
                  추가
                </button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="color2">
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
        <button type="button" className="my-page-btn" onClick={handleOpenModal}>
          세탁소 등록하기 (이미 등록했으면 버튼 안 뜰 것임)
        </button>
        <Button
          variant="contained"
          color="color2"
          className="my-page-btn"
          onClick={handleOpenModal}>
          세탁 품목 변경하기 (세탁소 등록 안 했으면 버튼 안 뜰 것임)
        </Button>
      </div>
      <div className="my-review-list">
        <div className="my-review-list-title">우리 세탁소 리뷰 보기</div>
        <div>총 {reviewList.length}개의 게시물을 작성하였습니다.</div>
        <div className="my-review-list-content">
          {reviewList.slice((page - 1) * 5, page * 5).map((review) => (
            <Link key={review} to="/ceo/mypage">
              <div className="my-review">{review}</div>
            </Link>
          ))}
          <div className="pagination">
            <Pagination
              count={Math.ceil(reviewList.length / 5)}
              page={page}
              // variant="outlined"
              color="color2"
              className={`${
                reviewList.length === 0 ? 'no-pagination' : 'pagination'
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
