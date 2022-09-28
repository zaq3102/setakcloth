import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SearchAddress from '../../common/SearchAddress';
import '../../../styles/Customer.scss';

const CtmHome: React.FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [detailaddress, setDetailaddress] = useState<string>('17층');

  // const modes = [0, 1, 2, 3, 4];

  const moveToList = () => {
    navigate('laundrylist');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    setOpen(false);
  };
  const [myaddress, setMyaddress] = useState<string>(
    '서울특별시 강남구 역삼동 멀티캠퍼스'
  );

  return (
    <div>
      <div className="ctm-home">
        <div className="ctm-address-area">
          <div className="my-address-title">우리 집</div>
          <br />
          <div>
            {myaddress}
            {detailaddress}
          </div>
          <div className="address-modify-btn">
            <Button variant="outlined" onClick={handleClickOpen}>
              수정하기
            </Button>
          </div>
        </div>
        {/* 주소 변경 모달 창 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>주소 변경하기</DialogTitle>
          <SearchAddress />
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleChange}>변경</Button>
          </DialogActions>
        </Dialog>
        <br /> <br />
      </div>
      <div className="list-buttons">
        <div className="list-buttons-up">
          <Button
            onClick={moveToList}
            fullWidth={false}
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}>
            <img
              className="laundry-list-img"
              src="../assets/heart.png"
              alt="favourite laundry list"
            />
            <div className="button-tag-text">즐겨찾기 세탁소 목록</div>
          </Button>
          <Button
            onClick={moveToList}
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}>
            <img
              className="laundry-list-img"
              src="../assets/clock.png"
              alt="recently used laundry list"
            />
            <div className="button-tag-text">최근 이용한 세탁소 목록</div>
          </Button>
        </div>
        <div className="list-buttons-down">
          <Button
            onClick={moveToList}
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}>
            <img
              className="laundry-list-img"
              src="../assets/map.png"
              alt="nearest laundry list"
            />{' '}
            <div className="button-tag-text"> 가까운 세탁소 목록</div>
          </Button>

          <Button
            onClick={moveToList}
            className="list-button-tag-set"
            sx={{
              maxWidth: '50%',
              minWidth: '50%'
            }}>
            <img
              className="laundry-list-img"
              src="../assets/star.png"
              alt="highest rate laundry list"
            />
            <div className="button-tag-text">별점 높은 세탁소 목록</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CtmHome;
