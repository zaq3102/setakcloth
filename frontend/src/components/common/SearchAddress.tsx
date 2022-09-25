import React from 'react';
import DaumPostcode from 'react-daum-postcode';

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
    <DaumPostcode
      autoClose={false}
      onComplete={handleComplete}
      onSearch={handleSearch}
    />
  );
};

export default SearchAddress;
