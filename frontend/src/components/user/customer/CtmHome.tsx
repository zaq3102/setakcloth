import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';

import * as React from 'react';
import { useState } from 'react';
import SearchAddress from '../../common/SearchAddress';
import '../../../styles/Customer.scss';

const CtmHome: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const [detailaddress, setDetailaddress] = useState<string>('17층');
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
    <div className="ctm-home">
      고객용 홈페이지입니다.
      <br />
      {myaddress}
      {detailaddress}
      <Button variant="outlined" onClick={handleClickOpen}>
        수정하기
      </Button>
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
      {/* 세탁소 리스트 */}
      <div className="ctm-laundry-list">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            즐겨찾기
            <button type="button">더보기</button>
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <br />
            <br />
            최근 이용한 세탁소
            <button type="button">더보기</button>
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={6}>
            근처 세탁소 목록
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
            <br />
            <TextField
              id="laundry1"
              defaultValue="세탁소 정보"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CtmHome;
