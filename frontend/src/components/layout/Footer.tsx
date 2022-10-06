import * as React from 'react';
import { Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <div>
      <footer>
        <Box className="footer-box">
          <div className="footer-left">
            <img
              className="footer-title"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/setakcloth.png"
              alt="logo"
            />
          </div>
          <div className="footer-right">
            <div className="footer-right-1">
              <div className="footer-bold">About</div>
              <div className="footer-content">Github 주소</div>
            </div>
            <div className="footer-right-2">
              <div className="footer-bold">Contact</div>
              <div className="footer-content">010)6613-3957</div>
            </div>
            <div className="footer-right-3">
              <div className="footer-bold">Creators</div>
              <div className="footer-content">A706</div>
            </div>
          </div>
        </Box>
      </footer>
    </div>
  );
};

export default Footer;
