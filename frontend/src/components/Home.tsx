import { Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import * as React from 'react';
import '../styles/User.scss';

const Home: React.FC = () => {
  return (
    <div className="wrap">
      <div className="banner">
        <div className="banner-title">
          <Typography variant="h2">
            Banking <br />
            Starts here
          </Typography>
          <Typography variant="h5">Banking Starts here</Typography>
          <br />
          <div className="banner-check">
            <DoneIcon color="success" />
            <Typography>dlkfjalk</Typography>
            <DoneIcon color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="banner-check">
            <DoneIcon color="success" />
            <Typography>dlkfjalk</Typography>
            <DoneIcon color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
        </div>
        <img
          className="banner-img"
          src="../../assets/landing0.png"
          alt="banner"
        />
      </div>
      <div className="mockup">
        <div className="mockup-title">
          <Typography variant="h4">블록체인 기반 투명한 유통과정</Typography>
          <Typography variant="h6">안전하게 믿고 사용할 수 있어요.</Typography>
          <br />
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
        </div>
        <img
          className="mockup-img"
          src="../../assets/landing1.png"
          alt="mockup1"
        />
      </div>
      <div className="mockup">
        <div className="mockup-title">
          <Typography variant="h4">우리 동네 세탁소를 한눈에</Typography>
          <Typography variant="h6">
            간편하게 내 주변의 세탁소를 검색해보세요.
          </Typography>
          <br />
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
        </div>
        <img
          className="mockup-img"
          src="../../assets/landing1.png"
          alt="mockup1"
        />
      </div>
      <div className="mockup">
        <div className="mockup-title">
          <Typography variant="h4">편리한 수거, 배달</Typography>
          <Typography variant="h6">
            문 앞에서 끝내는 세탁소 방문
            <br />
            직접 가지 않아도 돼요.
          </Typography>
          <br />
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
        </div>
        <img
          className="mockup-img"
          src="../../assets/landing1.png"
          alt="mockup1"
        />
      </div>
      <div className="mockup">
        <div className="mockup-title">
          <Typography variant="h4">궁금했던 세탁소 정보를 한눈에</Typography>
          <Typography variant="h6">
            얼마인지, 취급 품목이 무엇인지
            <br />
            물어보지 않아도 알 수 있어요.
          </Typography>
          <br />
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
          <div className="mockup-check">
            <DoneIcon className="mockup-check-icon" color="success" />
            <Typography>dlkfjalk</Typography>
          </div>
        </div>
        <img
          className="mockup-img"
          src="../../assets/landing1.png"
          alt="mockup1"
        />
      </div>
      ㄴ
    </div>
  );
};

export default Home;
