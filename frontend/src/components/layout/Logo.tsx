import * as React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="logo">
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
    </div>
  );
};

export default Logo;
