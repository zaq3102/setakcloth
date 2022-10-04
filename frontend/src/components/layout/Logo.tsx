import * as React from 'react';

const Logo: React.FC = () => {
  return (
    <>
      {/* <img
        className="logo-img"
        src="https://via.placeholder.com/150/BFD7EA/111111"
        alt=""
      /> */}
      <img
        className="logo-img"
        src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/logo3.png"
        alt="logo"
      />

      <img
        className="logo-text"
        src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/setakcloth.png"
        alt="logo"
      />
    </>
  );
};

export default Logo;
