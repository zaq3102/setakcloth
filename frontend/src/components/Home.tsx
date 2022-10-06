import { Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import * as React from 'react';
import '../styles/User.scss';

const Home: React.FC = () => {
  return (
    <div className="wrap">
      <div className="banner">
        <div className="banner-wrap">
          {/* 여기부터 왼쪽 */}
          <div className="banner-title-top">
            <div className="banner-title-1">
              <div>깨끗하게&nbsp;&nbsp;&nbsp;</div>
              <div>투명하게&nbsp;&nbsp;&nbsp;</div>
              <div>공정하게</div>
            </div>
          </div>
          {/* 여기까지 왼쪽 */}
          <div className="banner-img-div">
            <img
              className="banner-img"
              src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/redsanta.png"
              alt="banner"
            />
          </div>
          <div className="banner-title">
            <div className="banner-title-2">
              <div className="banner-title-text">세탁클로쓰</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mockup">
        <img
          className="mockup-img"
          src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/f625ab02-f115-43e7-9820-45913c252060_main-blockchain.png"
          alt="mockup0"
        />
        <div className="mockup-title">
          <div className="mockup-title-head">
            블록체인 기반
            <br />
            투명한 유통과정
          </div>
          <div className="mockup-title-body">
            안전하게 믿고
            <br />
            사용할 수 있어요.
          </div>
        </div>
      </div>

      <div className="mockup">
        <div className="mockup-title">
          <div className="mockup-title-head">편리한 수거, 배달</div>
          <div className="mockup-title-body">
            문 앞에서 끝내는 세탁소 방문
            <br />
            직접 가지 않아도 돼요.
          </div>
        </div>
        <img
          className="mockup-img"
          src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/1cff8c0c-753c-4b7e-aa37-d48b530547fc_main-laundry-deliver.png"
          alt="mockup2"
        />
      </div>
      <div className="mockup">
        <img
          className="mockup-img"
          src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/387bb5e0-e583-4cfa-bb55-d1495d0e2b88_shiny-laundry.png"
          alt="mockup1"
        />
        <div className="mockup-title">
          <div className="mockup-title-head">
            우리 동네 세탁소를
            <br />
            한눈에
          </div>
          <div className="mockup-title-body">
            간편하게 내 주변의
            <br />
            세탁소를 검색해보세요.
          </div>
        </div>
      </div>
      <div className="mockup-end">
        <div className="mockup-title">
          <div className="mockup-title-head">
            궁금했던 세탁소 정보
            <br />
            한눈에
          </div>
          <div className="mockup-title-body">
            얼마인지, 취급 품목이 무엇인지
            <br />
            물어보지 않아도 알 수 있어요.
          </div>
        </div>
        <img
          className="mockup-img"
          src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/a44a3f53-448e-4fac-80ea-ddf9c71e1ad0_main-laundry-info.png"
          alt="mockup3"
        />
      </div>
    </div>
  );
};

export default Home;
