import * as React from 'react';
import { Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <div>
      <footer>
        <Box className="footer-box">
          <div className="footer-left">
            <img
              className="footer-logo"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/logo3.png"
              alt="logo"
            />
            <img
              className="footer-title"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/setakcloth.png"
              alt="logo"
            />
          </div>
          <div className="footer-right">
            <div className="footer-right-1">
              <div className="footer-bold">
                주소 : 강남구 역삼동 멀티캠퍼스 1402호
              </div>
              <div className="footer-content">
                대표 이사 : 한상우 Contact : 010-6613-3957
              </div>
            </div>
          </div>
        </Box>
      </footer>
    </div>
  );
};

export default Footer;
