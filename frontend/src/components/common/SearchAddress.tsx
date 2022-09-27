import { TextField } from '@mui/material';
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

declare global {
  interface Window {
    kakao?: any;
  }
}
const { kakao } = window;

const SearchAddress = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress);
  };

  const handleSearch = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DaumPostcode
        autoClose={false}
        onComplete={handleComplete}
        onSearch={handleSearch}
      />
      <TextField
        id="outlined-basic"
        label="상세 주소 입력"
        variant="outlined"
      />
    </div>
  );
};

export default SearchAddress;
