import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import * as React from 'react';
import '../../../styles/Customer.scss';

const CtmLaundryList: React.FC = () => {
  return (
    <div className="customerlaundrylist">
      세탁소리스트입니다.
      <br />
      {/* 정렬 select */}
      <FormControl>
        <InputLabel id="select-label">정렬</InputLabel>
        <Select id="select">
          <MenuItem>거리순</MenuItem>
          <MenuItem>이용많은순</MenuItem>
          <MenuItem>별점높은순</MenuItem>
        </Select>
      </FormControl>
      {/* 즐겨찾기 */}
      <button type="button">즐겨찾기</button>
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
    </div>
  );
};
export default CtmLaundryList;
