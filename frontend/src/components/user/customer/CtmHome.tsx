import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../../../styles/Customer.scss';

const CtmHome: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [myaddress, setMyaddress] = useState<string>(
    '서울특별시 강남구 역삼동 멀티캠퍼스 17층'
  );
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    }, // 주소 선택 이벤트
    selectAddress: (data: any) => {
      console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `);
      setMyaddress(data.address);
      setOpenPostcode(false);
    }
  };
  return (
    <div className="customerhome">
      고객용 홈페이지입니다.
      <br />
      {myaddress} &nbsp;&nbsp;
      <Button variant="outlined" onClick={handleClickOpen}>
        수정하기
      </Button>
      {/* 주소 변경 모달 창 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>주소 변경하기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <button onClick={handle.clickButton} type="button">
              주소 검색
            </button>
          </DialogContentText>
          {openPostcode && (
            <DaumPostcode
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="서울특별시 강남구 역삼동 멀티캠퍼스" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>변경</Button>
        </DialogActions>
      </Dialog>
      <br /> <br />
      {/* 세탁소 리스트 */}
      <div className="laundry-list">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            즐겨찾기 &nbsp;&nbsp;
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
            최근 이용한 세탁소&nbsp;&nbsp;
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
